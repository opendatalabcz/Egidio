package cz.opendatalab.egidio.backend.business.entities.location

import cz.opendatalab.egidio.backend.shared.validation.constants.LocationValidationConstants.CITY_MAX_LENGTH
import cz.opendatalab.egidio.backend.shared.validation.constants.LocationValidationConstants.COUNTRY_MAX_LENGTH
import cz.opendatalab.egidio.backend.shared.validation.constants.LocationValidationConstants.HOUSE_NUMBER_MAX_LENGTH
import cz.opendatalab.egidio.backend.shared.validation.constants.LocationValidationConstants.POSTAL_CODE_MAX_LENGTH
import cz.opendatalab.egidio.backend.shared.validation.constants.LocationValidationConstants.REGION_MAX_LENGTH
import cz.opendatalab.egidio.backend.shared.validation.constants.LocationValidationConstants.STREET_MAX_LENGTH
import cz.opendatalab.egidio.backend.shared.validation.validators.NullOrNotBlank
import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size

@Entity(name = "Location")
@Table(name = "location")
class Location(
    @field:NotNull
    @field:NotBlank
    @field:Size(max = COUNTRY_MAX_LENGTH)
    @field:Column(name = "country")
    var country : String,

    @field:NullOrNotBlank
    @field:Size(max = REGION_MAX_LENGTH)
    @field:Column(name = "region")
    var region : String? = null,

    @field:NullOrNotBlank
    @field:Size(max = CITY_MAX_LENGTH)
    @field:Column(name = "city")
    var city : String? = null,

    @field:NullOrNotBlank
    @field:Size(max = STREET_MAX_LENGTH)
    @field:Column(name = "street")
    var street : String? = null,

    @field:NullOrNotBlank
    @field:Column(name = "houseNumber")
    @field:Size(max = HOUSE_NUMBER_MAX_LENGTH)
    var houseNumber : String? = null,

    @field:NullOrNotBlank
    @field:Size(max = POSTAL_CODE_MAX_LENGTH)
    @field:Column(name = "postalCode")
    var postalCode : String? = null,

    @field:Version
    @field:Column(name = "version")
    var version : Long? = null,

    @field:SequenceGenerator(
        name = ID_SEQUENCE_GENERATOR_NAME,
        sequenceName = "location_id_seq",
        initialValue = 10000,
        allocationSize = 10
    )
    @field:GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ID_SEQUENCE_GENERATOR_NAME)
    @field:Id
    @field:Column(name = ID_COLUMN_NAME)
    var id : Long? = null
) {
    companion object {
        const val ID_SEQUENCE_GENERATOR_NAME = "location_id_seq_gen"
        const val ID_COLUMN_NAME = "id"
    }
}
