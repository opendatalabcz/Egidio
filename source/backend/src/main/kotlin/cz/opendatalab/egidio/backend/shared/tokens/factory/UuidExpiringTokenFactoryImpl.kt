package cz.opendatalab.egidio.backend.shared.tokens.factory

import cz.opendatalab.egidio.backend.business.custom_component_types.Factory
import cz.opendatalab.egidio.backend.business.entities.embedables.EmbeddableExpiringToken
import cz.opendatalab.egidio.backend.shared.date_time.plus
import cz.opendatalab.egidio.backend.shared.uuid.UuidProvider
import java.time.Clock
import java.time.LocalDateTime
import java.util.UUID
import kotlin.time.Duration

@Factory
class UuidExpiringTokenFactoryImpl(
    val uuidProvider: UuidProvider,
    val clock: Clock
) : UuidExpiringTokenFactory {
    override fun create(validityDuration: Duration?, onIssue: (rawToken: UUID) -> Unit): EmbeddableExpiringToken<UUID> {
        val token = EmbeddableExpiringToken(
            token = uuidProvider.getNext(),
            expiresAt = validityDuration?.let { LocalDateTime.now(clock) + validityDuration }
        )
        onIssue(token.token)
        return token
    }
}