package cz.opendatalab.egidio.backend.business.services.user

import cz.opendatalab.egidio.backend.business.entities.user.PublishedContactDetailSettings
import cz.opendatalab.egidio.backend.business.entities.user.Role
import cz.opendatalab.egidio.backend.business.entities.user.User
import cz.opendatalab.egidio.backend.business.events.user.*
import cz.opendatalab.egidio.backend.business.exceptions.not_found.UserNotFoundException
import cz.opendatalab.egidio.backend.business.exceptions.not_unique.RegisteredUserEmailOrUsernameNotUniqueException
import cz.opendatalab.egidio.backend.business.projections.project.PublicUserInfo
import cz.opendatalab.egidio.backend.business.services.language.LanguageService
import cz.opendatalab.egidio.backend.persistence.repositories.UserRepository
import cz.opendatalab.egidio.backend.presentation.dto.user.AnonymousUserInfoCreateDto
import cz.opendatalab.egidio.backend.presentation.dto.user.PublishedContactDetailSettingsDto
import cz.opendatalab.egidio.backend.presentation.dto.user.UserRegistrationDto
import cz.opendatalab.egidio.backend.shared.converters.user.UserConverter
import cz.opendatalab.egidio.backend.shared.tokens.facade.ExpiringTokenFacade
import cz.opendatalab.egidio.backend.shared.uuid.UuidProvider
import jakarta.transaction.Transactional
import org.springframework.context.ApplicationEventPublisher
import org.springframework.security.authentication.InsufficientAuthenticationException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.time.Clock
import java.time.LocalDateTime
import java.util.*


@Service
@Transactional
class UserServiceImpl(
    val userRepository : UserRepository,
    val userConverter : UserConverter,
    val languageService : LanguageService,
    val expiringTokenFacade : ExpiringTokenFacade<String>,
    val uuidProvider : UuidProvider,
    val passwordEncoder : PasswordEncoder,
    val eventPublisher : ApplicationEventPublisher,
    val clock : Clock

) : UserService {
    override fun getUserById(id : Long) : User {
        return userRepository.findById(id).orElseThrow { UserNotFoundException() }
    }


    override fun getRegisteredUserByUsername(username : String) : User =
        userRepository.findByUsernameAndRegisteredIsTrue(username) ?: throw UserNotFoundException()

    override fun getRegisteredUserByPublicId(publicId : UUID) : User =
        userRepository.findUserByPublicIdAndRegistered(
            publicId = publicId,
            registered = true
        ) ?: throw UserNotFoundException()

    override fun getAnyUserByPublicId(publicId : UUID) : User =
        userRepository.findUserByPublicIdAndRegistered(
            publicId = publicId,
            registered = false
        ) ?: throw UserNotFoundException()

    override fun getPublicUserInfoByPublicId(publicId : UUID) : PublicUserInfo =
        userConverter.userToPublicUserInfo(getAnyUserByPublicId (publicId))

    private fun createPublishedContactDetailSettings(
        settingsDto : PublishedContactDetailSettingsDto
    ) : PublishedContactDetailSettings = PublishedContactDetailSettings(
        firstname = settingsDto.firstname,
        lastname = settingsDto.lastname,
        email = settingsDto.email,
        telephoneNumber = settingsDto.telephoneNumber
    )

    override fun createAnonymousUser(createDto : AnonymousUserInfoCreateDto) : User {
        val confirmationTokenWithRawValue = expiringTokenFacade.createWithRawValueIncluded(validityDuration = null)
        return userRepository.save(
            User(
                username = null,
                firstname = createDto.contact.firstname,
                lastname = createDto.contact.lastname,
                email = createDto.contact.email,
                phoneNumber = createDto.contact.telephoneNumber,
                password = null,
                spokenLanguages = languageService
                    .getAllByCodes(createDto.spokenLanguagesCodes)
                    .toMutableList(),
                registeredAt = LocalDateTime.now(clock),
                emailConfirmationToken = confirmationTokenWithRawValue.token,
                registered = false,
                role = Role.ANONYMOUS_USER,
                locked = true,
                publishedContactDetailSettings = createPublishedContactDetailSettings(createDto.publishedContactDetail),
                emailConfirmed = false,
                publicId = uuidProvider.getNext()
            )
        ).also {
            this.eventPublisher.publishEvent(
                AnonymousUserCreatedEvent(
                    AnonymousUserCreatedEventData(
                        publicId = requireNotNull(it.publicId),
                        email = it.email,
                        rawEmailConfirmationTokenValue = confirmationTokenWithRawValue.rawValue
                    )
                )
            )
        }
    }

    override fun confirmEmail(publicId : UUID, token : String) {
        val user = getAnyUserByPublicId(publicId)
        val emailConfirmationToken = user.emailConfirmationToken
        if (emailConfirmationToken == null || !expiringTokenFacade.checks(emailConfirmationToken, token)) {
            //Let's check if token is valid first.
            // That way it will be harder to find out whether user is already activated or whether the token is just invalid
            // during reconnaissance phase of an eventual attack
            throw InsufficientAuthenticationException("Invalid confirmation token!")
        }
        check(!user.emailConfirmed, { "Email is already confirmed!" })
        //As token was used, it shouldn't be available for next confirmation
        user.emailConfirmed = true
        user.emailConfirmationToken = null
        //User shouldn't be locked before he registers, therefore we activate him now
        user.locked = false
        eventPublisher.publishEvent(UserContactConfirmedEvent(requireNotNull(user.id)))
    }

    private fun createDefaultContactDetailsSettingsForRegisteredUser() = PublishedContactDetailSettings(
        firstname = true,
        lastname = false,
        email = false,
        telephoneNumber = false
    )

    override fun registerUser(userRegistrationDto : UserRegistrationDto) : User {
        if (userRepository.existsRegisteredWithEmailOrUsername(
                userRegistrationDto.email,
                userRegistrationDto.username,
        )) {
            throw RegisteredUserEmailOrUsernameNotUniqueException()
        }
        val emailConfirmationTokenWithRawValue = expiringTokenFacade.createWithRawValueIncluded(validityDuration = null)
        val savedUser = userRepository.save(
            User(
                username = userRegistrationDto.username,
                firstname = userRegistrationDto.firstname,
                lastname = userRegistrationDto.lastname,
                email = userRegistrationDto.email,
                phoneNumber = userRegistrationDto.telephoneNumber,
                password = passwordEncoder.encode(userRegistrationDto.password),
                //Right now spoken languages are not passed during registration,
                // therefor we initialize this with an empty array
                spokenLanguages = mutableListOf(),
                //Let's respect users privacy, and go with an old saying
                // "What is not explicitly agreed upon, is implicitly disagreed"
                //Only thing that must be always accessible is username atm.
                publishedContactDetailSettings = createDefaultContactDetailsSettingsForRegisteredUser(),
                emailConfirmed = false,
                emailConfirmationToken = emailConfirmationTokenWithRawValue.token,
                registered = true,
                registeredAt = LocalDateTime.now(),
                role = Role.USER,
                publicId = uuidProvider.getNext(),
                //Account is locked until user confirms email
                locked = true
            )
        )
        this.eventPublisher.publishEvent(UserRegisteredEvent(
            UserRegisteredEventData(
                publicId = savedUser.publicId,
                email = savedUser.email,
                rawEmailConfirmationTokenValue = emailConfirmationTokenWithRawValue.rawValue
            )
        ))
        return savedUser
    }
}