package cz.opendatalab.egidio.backend.shared.tokens.checker

import cz.opendatalab.egidio.backend.business.entities.embedables.EmbeddableExpiringToken
import cz.opendatalab.egidio.backend.shared.hasher.Hasher
import org.springframework.context.annotation.Primary
import org.springframework.stereotype.Component
import java.time.Clock
import java.time.OffsetDateTime

@Component
@Primary
class HashedStringExpiringTokenChecker(
    private val clock : Clock,
    private val stringTokenHasher : Hasher<String>
) : ExpiringTokenChecker<String> {
    override fun checks(token : EmbeddableExpiringToken<String>, value : String) : Boolean =
        (token.expiresAt?.isAfter(OffsetDateTime.now(clock)) ?: true) && stringTokenHasher.hash(value) == token.token
}