package cz.opendatalab.egidio.backend.presentation.dto.user

import io.swagger.v3.oas.annotations.media.Schema

@Schema(
    description = "Structure for update of settings of published contact detail level"
)
data class PublishedContactDetailSettingsUpdateDto(
    @Schema(
        description = "Is lastname published?",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    val lastname: Boolean,
    @Schema(
        description = "Is email published?",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    val email: Boolean,
    @Schema(
        description = "Is telephone number published?",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    val telephoneNumber: Boolean
)
