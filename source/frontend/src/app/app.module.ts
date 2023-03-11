import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HeaderComponent} from './components/header/header.component';
import {PreviewGridComponent} from './components/preview-grid/preview-grid.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {ProjectDetailComponent} from './components/project/project-detail/project-detail.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormlyModule} from "@ngx-formly/core";
import {FormlyMaterialModule} from "@ngx-formly/material";
import {FormlyMatDatepickerModule} from "@ngx-formly/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {NotFoundComponent} from './components/error-pages/not-found.component';
import {ContactUsComponent} from './components/contact-us/contact-us.component';
import {FormlyPresetModule} from "@ngx-formly/core/preset";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgxDropzoneModule} from "ngx-dropzone";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatSelectModule} from "@angular/material/select";
import {FooterComponent} from './components/footer/footer.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateFnsModule, MatDateFnsModule} from "@angular/material-date-fns-adapter";
import {cs} from "date-fns/locale";
import {LoginComponent} from './components/login/login.component';
import {NotificationComponent} from './components/notification/notification.component';
import {RegisterComponent} from './components/register/register.component';
import {MatPasswordStrengthModule} from "@angular-material-extensions/password-strength";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {ShareModule} from "ngx-sharebuttons";
import {MultilingualTextTranslatePipe} from './pipes/multilingual-text-translate.pipe';
import {
  ProjectDetailIntroComponent
} from './components/project/project-detail/project-detail-intro/project-detail-intro.component';
import {PageSidenavComponent} from './components/page-sidenav/page-sidenav.component';
import {
  ProjectImportantInformationComponent
} from './components/project/project-detail/project-important-information/project-important-information.component';
import {ProjectComponent} from './components/project/project.component';
import {GalleryModule} from "ng-gallery";
import {HelpListComponent} from './components/project/help-list/help-list.component';
import {
  AdvertisementDetailComponent
} from './components/advertisement/advertisement-detail/advertisement-detail.component';
import {ForbiddenComponent} from './components/error-pages/forbidden.component';
import {ErrorComponent} from './components/error-pages/error/error.component';
import {InternalServerErrorComponent} from './components/error-pages/internal-server-error.component';
import {Error4xxComponent} from './components/error-pages/error4xx.component';
import {Error5xxComponent} from './components/error-pages/error5xx.component';
import {MatDividerModule} from "@angular/material/divider";
import {MultilingualTextToCurrentLanguagePipe} from './pipes/multilingual-text-to-current-language.pipe';
import {MatTableModule} from "@angular/material/table";
import {
  AdvertisedItemInfoDialogComponent
} from './components/advertisement/advertised-item-info-dialog/advertised-item-info-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import {UserWithReviewComponent} from './components/user-with-review/user-with-review.component';
import {
  RatedEntityPreviewCardComponent
} from './components/rated-entity-preview-card/rated-entity-preview-card.component';
import {BarRatingModule} from "ngx-bar-rating";
import {MatCardModule} from "@angular/material/card";
import {
  RatedEntityPreviewCardTableComponent
} from './components/rated-entity-preview-card/rated-entity-preview-card-table/rated-entity-preview-card-table.component';
import {
  RatedEntityPreviewCardTableRowComponent
} from './components/rated-entity-preview-card/rated-entity-preview-card-table/rated-entity-preview-card-table-row/rated-entity-preview-card-table-row.component';
import {
  RatedEntityPreviewCardTableColumnComponent
} from './components/rated-entity-preview-card/rated-entity-preview-card-table/rated-entity-preview-card-table-column/rated-entity-preview-card-table-column.component';
import {
  AdvertisementResponseComponent
} from './components/advertisement/advertisement-response/advertisement-response.component';
import {KeyValueTableComponent} from './components/key-value-table/key-value-table.component';
import {
  ResponseItemEditDialogComponent
} from './components/advertisement/response-item-edit-dialog/response-item-edit-dialog.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {
  ResponseItemInfoDialogComponent
} from "./components/advertisement/response-item-info-dialog/response-item-info-dialog.component";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import {NgxTranslateMatPaginatorIntl} from "./utils/angular-component-utils/NgxTranslateMatPaginatorIntl";
import {
  CreateAdvertisementComponent
} from './components/advertisement/create-advertisement/create-advertisement.component';
import {MatListModule} from "@angular/material/list";
import {
  SearchableSelectionListComponent
} from './form-controls/common/searchable-selection-list/searchable-selection-list.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRadioModule} from "@angular/material/radio";
import {MatStepperModule} from "@angular/material/stepper";
import {
  CreateAdvertisementInfoFormComponent
} from './components/advertisement/create-advertisement/create-advertisement-info-form.component.ts/create-advertisement-info-form.component';
import {
  CreateAdvertisementListedItemsComponent
} from './components/advertisement/create-advertisement/create-advertisement-listed-items/create-advertisement-listed-items.component';
import {
  MultilingualTextInputComponent
} from './form-controls/common/multilingual-text-input/multilingual-text-input.component';
import {
  MultilingualTextareaComponent
} from './form-controls/common/multilingual-textarea/multilingual-textarea.component';
import {
  AdvertisedItemEditDialogComponent
} from "./components/advertisement/advertised-item-edit-dialog/advertised-item-edit-dialog.component";
import {
  LanguageSelectionComponentComponent
} from './form-controls/common/language-selection-component/language-selection-component.component';
import {
  CreateAdvertisementContactFormComponent
} from './components/advertisement/create-advertisement/create-advertisement-contact-form/create-advertisement-contact-form.component';
import {AddressInputComponent} from './form-controls/common/address-input/address-input.component';
import {
  ListedItemResourceSearchFieldComponent
} from './components/advertisement/listed-item-resource-search-field/listed-item-resource-search-field.component';
import {
  PublishedContactDetailsSettingsComponent
} from './form-controls/common/published-contact-details-settings/published-contact-details-settings.component';
import {
  AdvertisementHelpTypeSelectComponent
} from './form-controls/advertisement/advertisement-help-type-select/advertisement-help-type-select.component';
import {
  AdvertisementTemplateConfirmApplyDialogComponent
} from './components/advertisement/advertisement-template-confirm-apply-dialog/advertisement-template-confirm-apply-dialog.component';
import {UserMainPageComponent} from './components/user/user-main-page/user-main-page.component';
import {UserEditComponent} from './components/user/user-edit/user-edit.component';
import {
  UserEmailEditConfirmationDialogComponent
} from './components/user/user-edit/user-email-edit-confirmation-dialog/user-email-edit-confirmation-dialog.component';
import {
  UserEmailEditFormComponent
} from './components/user/user-edit/user-email-edit-form/user-email-edit-form.component';
import {
  UserFirstnameLastnameEditFormComponent
} from './components/user/user-edit/user-firstname-lastname-edit-form/user-firstname-lastname-edit-form.component';
import {
  UserTelephoneNumberEditFormComponent
} from './components/user/user-edit/user-telephone-number-edit-form/user-telephone-number-edit-form.component';
import {
  UserPublishedContactDetailEditComponent
} from './components/user/user-edit/user-published-contact-detail-edit/user-published-contact-detail-edit.component';
import {MatTabsModule} from "@angular/material/tabs";
import {
  UserEditSingleCodeConfirmationDialogComponent
} from './components/user/user-edit/user-edit-single-code-confirmation-dialog/user-edit-single-code-confirmation-dialog.component';
import { UserSpokenLanguagesEditFormComponent } from './components/user/user-edit/user-spoken-languages-edit-form/user-spoken-languages-edit-form.component';
import { KnownLanguageSelectionListComponent } from './form-controls/common/known-language-selection-list/known-language-selection-list.component';
import {MatChipsModule} from "@angular/material/chips";

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    HeaderComponent,
    PreviewGridComponent,
    ProjectDetailComponent,
    NotFoundComponent,
    ContactUsComponent,
    FooterComponent,
    LoginComponent,
    NotificationComponent,
    RegisterComponent,
    MultilingualTextTranslatePipe,
    ProjectDetailIntroComponent,
    PageSidenavComponent,
    ProjectImportantInformationComponent,
    ProjectComponent,
    HelpListComponent,
    AdvertisementDetailComponent,
    ForbiddenComponent,
    ErrorComponent,
    InternalServerErrorComponent,
    Error4xxComponent,
    Error5xxComponent,
    MultilingualTextToCurrentLanguagePipe,
    AdvertisedItemInfoDialogComponent,
    UserWithReviewComponent,
    RatedEntityPreviewCardComponent,
    RatedEntityPreviewCardTableComponent,
    RatedEntityPreviewCardTableRowComponent,
    RatedEntityPreviewCardTableColumnComponent,
    AdvertisementResponseComponent,
    KeyValueTableComponent,
    ResponseItemEditDialogComponent,
    ResponseItemInfoDialogComponent,
    CreateAdvertisementComponent,
    SearchableSelectionListComponent,
    CreateAdvertisementInfoFormComponent,
    CreateAdvertisementListedItemsComponent,
    MultilingualTextInputComponent,
    MultilingualTextareaComponent,
    AdvertisedItemEditDialogComponent,
    LanguageSelectionComponentComponent,
    CreateAdvertisementContactFormComponent,
    AddressInputComponent,
    ListedItemResourceSearchFieldComponent,
    PublishedContactDetailsSettingsComponent,
    AdvertisementHelpTypeSelectComponent,
    AdvertisementTemplateConfirmApplyDialogComponent,
    UserMainPageComponent,
    UserEditComponent,
    UserEmailEditConfirmationDialogComponent,
    UserEmailEditFormComponent,
    UserFirstnameLastnameEditFormComponent,
    UserTelephoneNumberEditFormComponent,
    UserPublishedContactDetailEditComponent,
    UserEditSingleCodeConfirmationDialogComponent,
    UserSpokenLanguagesEditFormComponent,
    KnownLanguageSelectionListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormlyPresetModule,
    FormlyModule.forRoot({
      presets: [
        {
          name: 'firstname',
          config: {
            key: 'firstname',
            type: 'input',
            props: {
              label: 'First Name',
            },
          },
        }, {
          name: 'lastname',
          config: {
            key: 'lastname',
            type: 'input',
            props: {
              label: 'Last Name',
            },
          },
        }
      ]
    }),
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NgxDropzoneModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    DateFnsModule,
    MatDateFnsModule,
    MatPasswordStrengthModule,
    MatCheckboxModule,
    RxReactiveFormsModule,
    ShareModule,
    GalleryModule,
    MatDividerModule,
    MatTableModule,
    MatRippleModule,
    MatDialogModule,
    MatSortModule,
    BarRatingModule,
    MatCardModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    LoggerModule.forRoot({
      //TODO: Add configuration of level for different envs
      level: NgxLoggerLevel.DEBUG,
    }),
    MatListModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatStepperModule,
    MatTabsModule,
    MatChipsModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: cs},
    {provide: MatPaginatorIntl, useClass: NgxTranslateMatPaginatorIntl},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
