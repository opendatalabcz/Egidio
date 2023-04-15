package cz.opendatalab.egidio.backend.business.services.advertisement

import cz.opendatalab.egidio.backend.business.authentication.annotations.PermitCoordinator
import cz.opendatalab.egidio.backend.business.entities.advertisement.Advertisement
import cz.opendatalab.egidio.backend.presentation.dto.advertisement.AdvertisementCreateDto
import cz.opendatalab.egidio.backend.shared.filters.AdvertisementFilter
import cz.opendatalab.egidio.backend.shared.pagination.CustomFilteredPageRequest
import cz.opendatalab.egidio.backend.shared.pagination.CustomPage
import jakarta.annotation.security.PermitAll

interface AdvertisementService {
    @PermitAll
    fun getPage(filteredPageRequest : CustomFilteredPageRequest<AdvertisementFilter>) : CustomPage<Advertisement>

    @PermitAll
    fun getBySlug(slug : String) : Advertisement

    @PermitAll
    fun createAdvertisement(advertisementCreateDto : AdvertisementCreateDto) : Advertisement

    @PermitCoordinator
    fun publishAdvertisement(slug : String)

    @PermitAll
    fun cancelAdvertisement(slug : String, token : String? = null)

    @PermitAll
    fun resolveAdvertisement(slug : String, token : String? = null)
}