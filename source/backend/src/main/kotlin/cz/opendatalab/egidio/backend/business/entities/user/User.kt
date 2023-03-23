package cz.opendatalab.egidio.backend.business.entities.user

import cz.opendatalab.egidio.backend.business.validation.user.UserValidationPatterns
import jakarta.annotation.Nullable
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.SequenceGenerator
import jakarta.persistence.Table
import jakarta.persistence.UniqueConstraint
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Pattern
import java.time.LocalDateTime
import java.util.UUID


/**
 * Entity representing a user
 *
 * <p>
 *     User is either registered or unregistered
 *     For simplicity both are stored in the same entity,
 *     as they both share the same properties.
 *     Only difference is uniqueness of their email.
 *     Emails must be unique among registered users
 * </p>
 */
@Entity(name="user")
@Table(
    name="user",
    uniqueConstraints = [
        UniqueConstraint(name = "public_id_unique_constraint", columnNames = ["public_id"]),
    ]
)
data class User(
    /**
     * Internal identifier of an User
     *
     * <p>Shouldn't be used to identify the object outside the application. Use publicId instead.</p>
     */
    @field:SequenceGenerator(name = idSequenceGeneratorName, sequenceName = "user_id_seq")
    @field:GeneratedValue(strategy = GenerationType.SEQUENCE, generator = idSequenceGeneratorName)
    @field:Id
    @field:Column(
        name = "id"
    )
    val id: Long = 0,

    @field:Column(
        name = "public_id"
    )
    val publicId: UUID?,

    @field:NotNull
    @field:Pattern(regexp = UserValidationPatterns.NAME_PART)
    @field:Column(name = "firstname")
    val firstname: String,

    @field:NotNull
    @field:Pattern(regexp = UserValidationPatterns.NAME_PART)
    @field:Column(name = "lastname")
    val lastname: String,

    @field:Nullable
    @field:Pattern(regexp = UserValidationPatterns.PHONE_NUMBER)
    @field:Column(name = "phone_number")
    val phoneNumber: String?,

    @field:NotNull
    @field:Email
    @field:Column(name = "email")
    val email: String?,

    @field:NotNull
    @field:Column(name = "registered_at")
    val registeredAt: LocalDateTime,

    @field:NotNull
    @field:Column(name = "contact_confirmed")
    val contactConfirmed: Boolean = false,

    @field:Nullable
    @field:Column(name="confirmation_token")
    val confirmationToken: String?,

    @field:NotNull
    @field:Column(name = "registered")
    val registered: Boolean,

    @field:NotNull
    @field:Column(name = "role")
    val role: Role = Role.USER
) {

    companion object {
        private const val idSequenceGeneratorName = "user_id_seq_gen"
    }
}