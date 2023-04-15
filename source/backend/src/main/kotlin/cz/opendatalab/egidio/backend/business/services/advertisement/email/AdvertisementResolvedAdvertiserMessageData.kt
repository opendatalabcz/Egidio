package cz.opendatalab.egidio.backend.business.services.advertisement.email

import cz.opendatalab.egidio.backend.business.entities.localization.MultilingualText

data class AdvertisementResolvedAdvertiserMessageData(
    val advertisementSlug: String,
    val advertisementTitle: MultilingualText,
    val advertiserEmail: String
)
