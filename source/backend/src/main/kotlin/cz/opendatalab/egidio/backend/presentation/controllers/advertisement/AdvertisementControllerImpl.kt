package cz.opendatalab.egidio.backend.presentation.controllers.advertisement

import cz.opendatalab.egidio.backend.business.services.advertisement.AdvertisementService
import cz.opendatalab.egidio.backend.presentation.dto.advertisement.AdvertisementCreateDto
import cz.opendatalab.egidio.backend.presentation.dto.advertisement.AdvertisementDetailDto
import cz.opendatalab.egidio.backend.shared.converters.advertisement.AdvertisementConverter
import cz.opendatalab.egidio.backend.shared.filters.AdvertisementFilter
import cz.opendatalab.egidio.backend.shared.pagination.CustomFilteredPageRequest
import io.swagger.v3.oas.annotations.Operation
import jakarta.validation.Valid
import jakarta.validation.constraints.NotBlank
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping(path = ["/advertisement"])
class AdvertisementControllerImpl(
    val advertisementService : AdvertisementService,
    val advertisementConverter : AdvertisementConverter
) : AdvertisementController {

    @Operation(summary = "Get detail of advertisement identified by given slug")
    @GetMapping(
        name = GET_ADVERTISEMENT_DETAIL_MAPPING_NAME,
        path = ["/{slug}/detail"],
    )
    override fun getAdvertisementDetail(
        @PathVariable("slug", required = true) @NotBlank slug : String
    ) : ResponseEntity<AdvertisementDetailDto> {
        return ResponseEntity.ok(
            this.advertisementService.getBySlug(slug).let(advertisementConverter::entityToDetailDto)
        )
    }

    @Operation(summary = "Get page of advertisements filtered by included filter")
    @PostMapping(
        name = "getAdvertisementsPage",
        path = ["/filtered-page"]
    )
    override fun getAdvertisementsPage(
        @RequestBody @Valid customFilteredPageRequest : CustomFilteredPageRequest<AdvertisementFilter>
    ) : ResponseEntity<*> {
        return ResponseEntity.ok(
            this.advertisementService.getPage(customFilteredPageRequest)
                .map(advertisementConverter::entityToShortDto)
        )
    }

    @Operation(summary = "Create new advertisement. Available only to coordinators/administrators.")
    @PostMapping(
        name = "createAdvertisement",
        path = [""],
    )
    override fun createAdvertisement(
        @Valid() @RequestBody advertisementCreateDto : AdvertisementCreateDto
    ) : ResponseEntity<String> {
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .contentType(MediaType.TEXT_PLAIN)
            .body(this.advertisementService.createAdvertisement(advertisementCreateDto).slug)
    }

    @Operation(summary = "Publish advertisement. Available only to coordinators/administrators.")
    @PostMapping(path = ["/{slug}/publish"])
    @ResponseStatus(HttpStatus.NO_CONTENT)
    override fun publishAdvertisement(@PathVariable("slug", required = true) @NotBlank slug : String) {
        this.advertisementService.publishAdvertisement(slug)
    }

    @Operation(summary = "Cancel advertisement.")
    @PostMapping("/{slug}/cancel/{token}", "/{slug}/cancel")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    override fun cancelAdvertisement(
        @PathVariable("slug", required = true) @NotBlank slug : String,
        @PathVariable("token", required = false) token : String?
    ) {
        this.advertisementService.cancelAdvertisement(slug, token)
    }

    @PostMapping("/{slug}/resolve/{token}", "/{slug}/resolve")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    override fun resolveAdvertisement(
        @PathVariable("slug", required = true) @NotBlank slug : String,
        @PathVariable("token", required = false) token : String?
    ) {
        this.advertisementService.resolveAdvertisement(slug, token)
    }

    companion object {
        const val GET_ADVERTISEMENT_DETAIL_MAPPING_NAME = "getAdvertisementDetail"
    }
}