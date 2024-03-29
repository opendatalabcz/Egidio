package cz.opendatalab.egidio.backend.business.event_listeners.user.change_request

import cz.opendatalab.egidio.backend.business.events.user.TelephoneNumberChangeRequestCreatedEvent
import cz.opendatalab.egidio.backend.business.services.user.email.UserEmailService
import cz.opendatalab.egidio.backend.business.services.user.email.messages_data.TelephoneNumberChangeRequestCreatedMessageData
import org.springframework.stereotype.Component
import org.springframework.transaction.event.TransactionPhase
import org.springframework.transaction.event.TransactionalEventListener

@Component
class TelephoneNumberChangRequestCreatedEventListenersGroup(
    private val userEmailService : UserEmailService
) {
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    fun sendTelephoneNumberChangeRequestCreated(event : TelephoneNumberChangeRequestCreatedEvent) {
        this.userEmailService.sendTelephoneNumberChangeRequestCreated(
            TelephoneNumberChangeRequestCreatedMessageData(
                email = event.data.email,
                rawConfirmationToken = event.data.rawConfirmationToken
            )
        )
    }
}