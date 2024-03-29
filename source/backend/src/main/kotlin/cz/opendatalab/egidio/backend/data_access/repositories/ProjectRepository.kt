package cz.opendatalab.egidio.backend.data_access.repositories

import cz.opendatalab.egidio.backend.business.entities.project.Project
import cz.opendatalab.egidio.backend.business.entities.project.ProjectStatus
import cz.opendatalab.egidio.backend.business.projections.project.CatastropheTypeAndProjectStatus
import cz.opendatalab.egidio.backend.shared.filters.ProjectFilter
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface ProjectRepository : JpaRepository<Project, Long> {
    fun findBySlug(slug: String): Project?

    @Query(
        """
        SELECT distinct project 
        FROM Project project
        JOIN project.title.texts project_title_translations
        WHERE 
            ( :#{#filter.projectStatuses == null || #filter.projectStatuses.empty} = true OR project.status IN :#{#filter.projectStatuses})
            AND ( :#{#filter.title == null} = true OR (
                    (
                        project_title_translations.language.code = :#{#filter.title?.languageCode}
                        OR project_title_translations.language = project.title.defaultTextLanguage
                    )
                    AND project_title_translations.text LIKE %:#{#filter.title?.text}%
                ) 
            )
            AND ( :#{#filter.catastropheTypes == null} = true OR project.catastropheType IN :#{#filter.catastropheTypes} )
            AND ( :#{#filter.publishedAfter == null} = true OR (
                    project.publishedAt IS NOT NULL
                    AND project.publishedAt >= :#{#filter.publishedAfter}
                ) 
            )
            AND ( :#{#filter.publishedBefore == null} = true OR (
                    project.publishedAt IS NOT NULL
                    AND project.publishedAt <= :#{#filter.publishedBefore}
                ) 
            )
    """
    )
    fun getByFilter(@Param("filter") filter: ProjectFilter, pageable: Pageable): Page<Project>
    fun existsBySlugAndStatusIsIn(slug: String, status: Set<ProjectStatus>): Boolean
    fun findAllBySlugIn(slugs: List<String>): List<Project>

    @Query(
        """
        SELECT new cz.opendatalab.egidio.backend.business.projections.project.CatastropheTypeAndProjectStatus(
                    p.catastropheType, 
                    p.status
        )
        FROM Project p
        WHERE p.slug = :slug
    """
    )
    fun findCatastropheTypeAndProjectStatusBySlug(@Param("slug") slug: String): CatastropheTypeAndProjectStatus?
}