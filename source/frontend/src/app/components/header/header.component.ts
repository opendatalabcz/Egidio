import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectShort} from "../../models/projects/project";
import {distinctUntilChanged, first, map, mergeMap, Observable, of, Subscription} from "rxjs";
import {ProjectService} from "../../services/project.service";
import {MultilingualTextService} from "../../services/multilingual-text.service";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {LanguageService} from "../../services/language.service";
import {ReadOnlyLanguage} from "../../models/common/language";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {UserService} from "../../services/user.service";
import {isObjectNotNullOrUndefined} from "../../shared/predicates/object-predicates";
import {ProjectStatus} from "../../models/projects/project-status";
import {AuthenticationService} from "../../services/authentication.service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('navbarOpenClose', [
      state(
        'open',
        style({ height: `calc({{numberOfItems}} * {{rowHeight}})`, opacity: 1, display: 'visible'}),
        {params: {numberOfItems: 1, rowHeight: '4em'}}
      ),
      //Display none is there, so elements are not visible after collapse
      state('close', style({ height: 0, opacity: 0, display: 'none' })),
      //Display visible is needed, so anim
      transition('close => open', [style({display: 'visible'}), animate('500ms ease-in-out')]),
      transition('open => close', animate('500ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  private projectSubscription?: Subscription
  private breakpoint$: Observable<BreakpointState>
  public project?: ProjectShort
  public translatedProjectTitle$?: Observable<string>
  public projectPrefix?: string
  public projectHomepage?: string

  public isCollapsedVariant = false
  public isCollapsed = true
  public collapsedVariantsBreakpoints: string[] = [
    Breakpoints.XSmall,
    Breakpoints.Small
  ]

  constructor(private projectService: ProjectService,
              private languageService: LanguageService,
              public localizationService: MultilingualTextService,
              public breakpointObserver: BreakpointObserver,
              public userService: UserService,
              public authService: AuthenticationService,
              private notificationService: NotificationService,
              private router: Router) {
    this.breakpoint$ = this.breakpointObserver
      .observe([
        Breakpoints.Large,
        Breakpoints.Medium,
        Breakpoints.Small,
        Breakpoints.XSmall,
      ])
      .pipe(distinctUntilChanged())
    this.onScreenSizeChanges()
  }

  ngOnInit() {
    this.projectSubscription =
      this.projectService.currentProjectSlug$
        .pipe(
          mergeMap((slug) => slug ? this.projectService.getShortBySlug(slug) : of(undefined)),
          untilDestroyed(this)
        )
        .subscribe((project?: ProjectShort) => {
          this.project = project;
          this.projectPrefix = this.projectService.urlPrefixFromProjectSlug(this.project?.slug)
          this.projectHomepage = this.projectService.projectMainPageLinkFromProjectSlug(this.project?.slug)
          this.translatedProjectTitle$ =
            this.project ? this.localizationService.toLocalizedTextValueForCurrentLanguage$(this.project.title) : undefined
        });
    this.breakpoint$
      .subscribe(() => this.onScreenSizeChanges())
  }

  private onScreenSizeChanges() {
    this.isCollapsedVariant = this.breakpointObserver.isMatched(this.collapsedVariantsBreakpoints)
    //We want menu to be collapsed on initial transition from large screen to medium/small screen
    //When we are just transitioning between small/medium screen, we want it to remain opened/close
    this.isCollapsed = !this.isCollapsedVariant || this.isCollapsed;
  }

  compareLangsByCode(firstLang: ReadOnlyLanguage, secondLang: ReadOnlyLanguage): boolean {
    return firstLang.code.localeCompare(secondLang.code) === 0
  }

  trackByLangCode(_index: number, lang: ReadOnlyLanguage): string {
    return lang.code
  }

  ngOnDestroy() {
    this.projectSubscription?.unsubscribe();
  }

  changeLanguage(language: ReadOnlyLanguage) {
    this.languageService.changeAppLanguageByCode(language.code)
  }

  get currentLanguage$(): Observable<ReadOnlyLanguage> {
    return this.languageService.currentLanguage$
  }

  get isProjectSelected(): boolean {
    return !!this.project
  }

  get availableLanguages(): readonly ReadOnlyLanguage[] {
    return this.languageService.readonlyAvailableLanguages
  }

  get advertisementCreationAllowed() : boolean {
    return this.project?.status == ProjectStatus.PUBLISHED
  }

  getNavLink(relativePath: string): string {
    return this.projectPrefix + relativePath
  }

  get accountIconLink$(): Observable<string> {
    return this.isUserLoggedIn$.pipe(
      map(isUserLoggedIn => this.getNavLink(isUserLoggedIn ? 'user/edit' : 'login'))
    )
  }

  signout() {
    this.notificationService.startLoading("SIGNOUT.PROCESSING", true)
    this.authService
      .logout$()
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("SIGNOUT.SUCCESS", true)
          this.router.navigate([this.projectService.routeRelativeToCurrentProject$("/login")])
        },
        error: () => {
          this.notificationService.failure("SIGNOUT.FAILURE", true)
        }
      })
      .add(() => this.notificationService.stopLoading())
  }

  get isUserLoggedIn$(): Observable<boolean> {
    return this.userService.loggedUserInfo$(false)
      .pipe(map(isObjectNotNullOrUndefined))
  }

}
