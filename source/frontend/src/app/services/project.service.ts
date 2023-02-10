import {Injectable} from '@angular/core';
import {Project, ProjectShort} from "../models/projects/project";
import {ProjectFilter} from "../models/projects/project-filter";
import {BehaviorSubject, first, map, Observable, of, timer} from "rxjs";
import {CatastropheType} from "../models/projects/catastrophe-type";
import {MultilingualText} from "../models/common/multilingual-text";
import {TranslateService} from "@ngx-translate/core";
import {Page} from "../models/pagination/page";
import {PageRequest} from "../models/pagination/page-request";
import {ProjectConverter} from "../utils/convertors/project-converter";
import {pageFromItems} from "../utils/page-utils";
import {SortDirection} from "../models/common/sort-direction";
import {endOfDay, isAfter, isBefore, startOfDay} from "date-fns";
import {ImportantInformation, ProjectDetailsIntroPage} from "../models/projects/projectPages";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private static readonly RESPONSE_INTERVAL: number = 1500
  private projects: Project[] = [{
    title: new MultilingualText(
      "cs", [
        {text: "Válka na Ukrajině", lang: "cs"},
        {text: "Animals invasion to Ukraine", lang: "en"}
      ]
    ),
    description: new MultilingualText(
      "cs",
      [{text: "Válka na Ukrajině začala v únoru 2022 a měla velký dopad na život v celé Evropě", lang: "cs"}]
    ),
    slug: "ukrajina",
    creationDate: new Date(2022, 0, 1),
    publishDate: new Date(2022, 1, 2),
    catastropheType: CatastropheType.WAR
  }, {
    title: new MultilingualText("cs", [{text: "Povodně 2022", lang: "cs"}]),
    description: new MultilingualText(
      "cs", [{text: "Povodně při nichž byla vyplaveno mnoho oblastí celé ČR", lang: "cs"}]
    ),
    slug: "povodně-2022",
    creationDate: new Date(2022, 0, 1),
    publishDate: new Date(2022, 1, 3),
    catastropheType: CatastropheType.FLOODING
  }, {
    title: new MultilingualText("cs", [{text: "Blizzard 2022", lang: "cs"}]),
    description: new MultilingualText("cs", [{text: "Velká sněhová vánice", lang: "cs"}]),
    slug: "blizzard-2022",
    creationDate: new Date(2022, 0, 1),
    publishDate: new Date(2022, 1, 4),
    catastropheType: CatastropheType.HURRICANE
  }, {
    title: new MultilingualText("cs", [{text: "Blizzard 2023", lang: "cs"}]),
    description: new MultilingualText("cs", [{text: "Velká sněhová vánice", lang: "cs"}]),
    slug: "blizzard-2023",
    creationDate: new Date(2022, 0, 1),
    publishDate: new Date(2023, 1, 5),
    catastropheType: CatastropheType.HURRICANE
  }, {
    title: new MultilingualText(
      "cs", [{text: "Válka na Ukrajině", lang: "cs"}, {text: "Animals invasion to Ukraine", lang: "en"}]
    ),
    description: new MultilingualText(
      "cs",
      [{text: "Válka na Ukrajině začala v únoru 2022 a měla velký dopad na život v celé Evropě", lang: "cs"}]
    ),
    slug: "ukrajina-1",
    creationDate: new Date(2022, 0, 1),
    publishDate: new Date(2022, 1, 6),
    catastropheType: CatastropheType.WAR
  }, {
    title: new MultilingualText("cs", [{text: "Povodně 2023", lang: "cs"}]),
    description: new MultilingualText(
      "cs", [
        {text: "Povodně při nichž byla vyplaveno mnoho oblastí celé ČR", lang: "cs"},
        {text: "Floodings you don't wanna see", lang: "en"}
      ],
    ),
    slug: "povodně-2023",
    creationDate: new Date(2023, 0, 1),
    publishDate: new Date(2023, 1, 7),
    catastropheType: CatastropheType.FLOODING
  }, {
    title: new MultilingualText("cs", [{text: "Blizzard 2022/2023", lang: "cs"}]),
    description: new MultilingualText("cs", [{text: "Velká sněhová vánice", lang: "cs"}]),
    slug: "blizzard-2022-2023",
    creationDate: new Date(2022, 0, 1),
    publishDate: new Date(2022, 1, 8),
    catastropheType: CatastropheType.HURRICANE
  }, {
    title: new MultilingualText("cs", [{text: "Blizzard 2023/2024", lang: "cs"}]),
    description: new MultilingualText("cs", [{
      lang: "cs",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat. Vestibulum fermentum tortor id mi. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam dapibus fermentum ipsum. Maecenas fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Etiam bibendum elit eget erat. Mauris elementum mauris vitae tortor. Fusce wisi. " +
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat. Vestibulum fermentum tortor id mi. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam dapibus fermentum ipsum. Maecenas fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Etiam bibendum elit eget erat. Mauris elementum mauris vitae tortor. Fusce wisi. " +
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat. Vestibulum fermentum tortor id mi. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam dapibus fermentum ipsum. Maecenas fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Etiam bibendum elit eget erat. Mauris elementum mauris vitae tortor. Fusce wisi. "
    }]),
    slug: "blizzard-2023-2024",
    creationDate: new Date(2023, 0, 1),
    publishDate: new Date(2023, 1, 2),
    catastropheType: CatastropheType.HURRICANE
  }]

  private static readonly PROJECTS_MAIN_PAGE_COMMON = 'details'

  projectDetailsPages: { projectSlug: string, detailsPage: ProjectDetailsIntroPage }[] = [
    {
      projectSlug: 'ukrajina',
      detailsPage: {
        title: new MultilingualText(
          "cs", [
            {text: "Válka na Ukrajině", lang: "cs"},
            {text: "Animals invasion to Ukraine", lang: "en"}
          ]
        ),
        text: new MultilingualText(
          "cs",
          [{text: "Válka na Ukrajině začala v únoru 2022 a měla velký dopad na život v celé Evropě", lang: "cs"}]
        ),
        //Real slug would be something like ukrajina-intro-gallery
        gallerySlug: 'universal-intro-gallery'
      }
    }
  ]

  private _currentProjectSlug$
    = new BehaviorSubject<string | null | undefined>(null)

  importantInformation: ImportantInformation[] = [
    {
      title: MultilingualText.of({text: 'seznam.cz', lang: 'cs'}),
      text: MultilingualText.of({text: 'Najdete zde co neznáte', lang: 'cs'}),
      links: [{title: MultilingualText.of({text: 'seznam.cz', lang: 'cs'}), location: 'https://www.seznam.cz'}]
    }
  ]

  private currentLanguage: string

  constructor(private translateService: TranslateService,
              private projectConverter: ProjectConverter
  ) {
    this.currentLanguage = translateService.currentLang
    this.translateService.onLangChange.subscribe(event => this.currentLanguage = event.lang)
  }

  private matchesFilter(project: Project, filter: ProjectFilter): boolean {
    console.log("here")
    return (
      (!filter.title || !!project.title.getTextForLanguageOrDefault("cs").text.match(".*" + filter.title + ".*"))
      && (
        !filter.publishedAfter
        || (!!project.publishDate && isBefore(startOfDay(filter.publishedAfter), endOfDay(project.publishDate)))
      )
      && (
        !filter.publishedBefore
        || (!!project.publishDate && isAfter(endOfDay(filter.publishedBefore), startOfDay(project.publishDate)))
      )
      && (filter.catastropheTypes.length == 0
        || filter.catastropheTypes.indexOf(project.catastropheType) >= 0)
    )
  }

  private filterProjects(projects: Project[], pageRequest: PageRequest, filter?: ProjectFilter): Page<Project> {
    //TODO: Remove this function, when server side filtering is done
    const compareFn
      = (first: Project, second: Project) => second.creationDate.getMilliseconds() - first.creationDate.getMilliseconds()
    const orderedProjects = [...projects].sort(compareFn)
    if (pageRequest.sortDirection == SortDirection.DESCENDING) {
      orderedProjects.reverse()
    }
    const filteredProjects
      = filter ? orderedProjects.filter((project) => this.matchesFilter(project, filter)) : projects
    return pageFromItems(filteredProjects, pageRequest)
  }

  /**
   * Get all available projects filtered according to given filter
   *
   * @param filter Filter by which projects should be selected
   */
  public getPage$(pageRequest: PageRequest, filter?: ProjectFilter): Observable<Page<ProjectShort>> {
    //TODO: Retrieve filtered projects from server instead
    return timer(ProjectService.RESPONSE_INTERVAL)
      .pipe(first())
      .pipe(
        map(() => this.filterProjects(this.projects, pageRequest, filter))
      )
  }

  public getBySlug(slug: string): Observable<Project | undefined> {
    //TODO: Retrieve filtered projects from server instead
    const project = this.projects.find(listedProject => listedProject.slug === slug)
    if (!project)
      throw new Error("Project with slug " + slug + " not found!")
    return of(project)
  }

  public getShortBySlug(slug: string): Observable<ProjectShort | undefined> {
    return this.getBySlug(slug)
      .pipe(map(project => project ? this.projectConverter.detailedToShort(project) : undefined))
  }

  getDetailsPage(projectSlug: string): Observable<ProjectDetailsIntroPage | undefined> {
    return timer(1000).pipe(
      map(() => this.projectDetailsPages.find(page => page.projectSlug.localeCompare(projectSlug) === 0)?.detailsPage)
    )
  }

  projectExists(projectSlug: string): Observable<boolean> {
    return of(!!this.projects?.find(project => project.slug?.localeCompare(projectSlug) === 0))
  }

  getImportantInformation(projectSlug: string): Observable<ImportantInformation[] | undefined> {
    return timer(1000).pipe(
      map(() => {
        if (this.projects.find(project => project.slug.localeCompare(projectSlug) == 0)) {
          return this.importantInformation
        } else return undefined
      })
    )
  }

  public set currentProjectSlug(value: string | null | undefined) {
    this._currentProjectSlug$.next(value);
  }

  public get currentProjectSlug$(): Observable<string | null | undefined> {
    return this._currentProjectSlug$
  }

  public getProjectSlugFromRoute(route: ActivatedRoute): string | undefined {
    return route.snapshot.params['projectSlug']
  }

  public projectMainPageLinkFromProjectSlug(slug?: string) {
    return "/" + this.urlPrefixFromProjectSlug(slug) + ProjectService.PROJECTS_MAIN_PAGE_COMMON
  }

  public urlPrefixFromProjectSlug(slug?: string | null) {
    return slug ? `/project/${slug}/` : '';
  }

  public routeRelativeToCurrentProject$(path: string): Observable<string> {
    return this.currentProjectSlug$.pipe(
      map(slug => this.urlPrefixFromProjectSlug(slug) + path)
    )
  }
}
