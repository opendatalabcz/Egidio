import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsComponent} from "./components/projects/projects.component";
import {ProjectDetailComponent} from "./components/project/project-detail/project-detail.component";
import {NotFoundComponent} from "./components/error-pages/not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {
  ProjectDetailIntroComponent
} from "./components/project/project-detail/project-detail-intro/project-detail-intro.component";
import {ProjectComponent} from "./components/project/project.component";
import {
  ProjectImportantInformationComponent
} from "./components/project/project-detail/project-important-information/project-important-information.component";
import {HelpListComponent} from "./components/project/help-list/help-list.component";
import {
  AdvertisementDetailComponent
} from "./components/advertisement/advertisement-detail/advertisement-detail.component";
import {ForbiddenComponent} from "./components/error-pages/forbidden.component";
import {InternalServerErrorComponent} from "./components/error-pages/internal-server-error.component";
import {Error4xxComponent} from "./components/error-pages/error4xx.component";
import {Error5xxComponent} from "./components/error-pages/error5xx.component";
import {
  CreateAdvertisementComponent
} from "./components/advertisement/create-advertisement/create-advertisement.component";
import {UserMainPageComponent} from "./components/user/user-main-page/user-main-page.component";
import {UserEditComponent} from "./components/user/user-edit/user-edit.component";
import {
  AdvertisementResponseResolvePreviewComponent
} from "./components/advertisement/advertisement-response-resolve-preview/advertisement-response-resolve-preview.component";
import {UserConfirmationComponent} from "./components/user/user-confirmation/user-confirmation.component";
import {
  AdvertisementCancelComponent
} from "./components/advertisement/advertisement-cancel/advertisement-cancel.component";
import {
  AdvertisementResolveComponent
} from "./components/advertisement/advertisement-resolve/advertisement-resolve.component";
import {LoggedUserResolver} from "./resolvers/logged-user.resolver";
import {TermsOfServicesComponent} from "./components/terms-of-services/terms-of-services.component";
import {PrivacyPolicyComponent} from "./components/privacy-policy/privacy-policy.component";

const reusedOkRoutes: Routes = [
  {
    path: "projects",
    component: ProjectsComponent,
    title: "PAGES_TITLES.PROJECTS"
  },
  // {
  //   path: "contact-us",
  //   component: ContactUsComponent,
  //   title: "PAGES_TITLES.CONTACT_US"
  // },
  {
    path: "login",
    component: LoginComponent,
    title: 'PAGES_TITLES.LOGIN'
  },
  {
    path: "register",
    component: RegisterComponent,
    title: 'PAGES_TITLES.REGISTER'
  },
  {
    path: 'user',
    component: UserMainPageComponent,
    title: 'PAGES_TITLES.USER'
  },
  {
    path: 'user/edit',
    component: UserEditComponent,
    title: 'PAGES_TITLES.USER_EDIT'
  },
  {
    path: 'advertisement/:advertisementId/cancel/:token',
    component: AdvertisementCancelComponent,
    title: 'PAGES_TITLES.ADVERTISEMENT_CANCEL'
  },
  {
    path: 'advertisement/:advertisementId/cancel',
    component: AdvertisementCancelComponent,
    title: 'PAGES_TITLES.ADVERTISEMENT_CANCEL'
  },
  {
    path: 'advertisement/:advertisementId/resolve/:token',
    component: AdvertisementResolveComponent,
    title: 'PAGES_TITLES.ADVERTISEMENT_RESOLVE'
  },
  {
    path: 'advertisement/:advertisementId/resolve',
    component: AdvertisementResolveComponent,
    title: 'PAGES_TITLES.ADVERTISEMENT_RESOLVE'
  },
  {
    path: 'advertisement/:advertisementId',
    component: AdvertisementDetailComponent,
    title: 'PAGES_TITLES.ADVERTISEMENT_DETAIL'
  },
  {
    path: 'advertisement-response/:id/preview/:token',
    component: AdvertisementResponseResolvePreviewComponent,
    title: 'PAGES_TITLES.ADVERTISEMENT_RESPONSE_PREVIEW'
  },
  {
    path: 'advertisement-response/preview/:id',
    component: AdvertisementResponseResolvePreviewComponent,
    title: 'PAGES_TITLES.ADVERTISEMENT_RESPONSE_PREVIEW'
  },
  {
    path: 'terms-of-services',
    component: TermsOfServicesComponent,
    title: 'PAGES_TITLES.TERMS_OF_SERVICES'
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    title: 'PAGES_TITLES.PRIVACY_POLICY'
  }
]

const errorRoutes: Routes = [
  {
    path: "errors/forbidden",
    component: ForbiddenComponent,
    title: 'PAGES_TITLES.HTTP_FORBIDDEN'
  },
  {
    path: "errors/not-found",
    component: NotFoundComponent,
    title: 'PAGES_TITLES.HTTP_NOT_FOUND'
  },
  {
    path: "errors/4xx",
    component: Error4xxComponent,
    title: 'PAGES_TITLES.HTTP_CLIENT_SIDE_ERROR'
  },
  {
    path: "errors/internal-server-error",
    component: InternalServerErrorComponent,
    title: 'PAGES_TITLES.HTTP_INTERNAL_SERVER_ERROR'
  },
  {
    path: "errors/5xx",
    component: Error5xxComponent,
    title: 'PAGES_TITLES.SERVER_SIDE_ERROR'
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: 'PAGES_TITLES.HTTP_NOT_FOUND',
  }
]

const routes: Routes = [
  //Pages accessible without selected project must be declared first,
  //otherwise "projects" would be considered to be projectSlug
  {
    path: "",
    resolve: {loggedUserInfo: LoggedUserResolver},
    runGuardsAndResolvers: 'always',
    children: [
      {path: "", pathMatch: "full", redirectTo: "projects"},
      ...reusedOkRoutes,
      {path: "user/:publicId/confirm-email/:token", component: UserConfirmationComponent},
      {path: "user/:publicId/confirm-email", component: UserConfirmationComponent},
      {
        path: "project/:projectSlug", component: ProjectComponent, children: [
          //We want details page to be the default page of project
          {path: "", redirectTo: "details", pathMatch: "full"},
          {
            path: "details", component: ProjectDetailComponent, children: [
              {path: '', redirectTo: "intro", pathMatch: "full"},
              {path: 'intro', component: ProjectDetailIntroComponent, title: 'PAGES_TITLES.PROJECT_INTRO'},
              {
                path: 'important-info',
                component: ProjectImportantInformationComponent,
                title: 'PAGES_TITLES.PROJECT_IMPORTANT_INFO'
              },
            ]
          },
          {
            path: 'help-list',
            component: HelpListComponent,
            title: 'PAGES_TITLES.HELP_LIST'
          },
          //Advertisement creation path wasn't moved to reusable routes,
          // as right now it's allowed to create advertisement only when project is selected
          {
            path: 'advertisement/create',
            component: CreateAdvertisementComponent,
            title: 'PAGES_TITLES.CREATE_ADVERTISEMENT'
          },
          ...reusedOkRoutes,
          ...errorRoutes
        ]
      },
      ...errorRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
