package cz.opendatalab.egidio.backend.persistence.repositories

import cz.opendatalab.egidio.backend.business.entities.localization.MultilingualText
import org.springframework.data.repository.CrudRepository

interface MultilingualTextRepository : CrudRepository<MultilingualText, Long>{}