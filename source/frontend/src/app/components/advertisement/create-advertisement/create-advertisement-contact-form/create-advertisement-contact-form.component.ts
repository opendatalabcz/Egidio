import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {Nullable} from "../../../../shared/types/common";
import {
  EMAIL_MAX_LENGTH,
  FIRSTNAME_MAX_LENGTH,
  LASTNAME_MAX_LENGTH, PHONE_NUMBER_MAX_LENGTH,
  phoneNumberValidator
} from "../../../../validators/contact-validators";
import {Contact, PublishedContactDetailSettings} from "../../../../models/common/contact";
import {
  PublishedContactDetailsSettingsComponentSettings
} from "../../../../form-controls/common/published-contact-details-settings/published-contact-details-settings.component";
import {ReadOnlyLanguage} from "../../../../models/common/language";
import {Observable} from "rxjs";
import {ProjectService} from "../../../../services/project.service";

class ContactFormControlNames {
  firstname = "firstname"
  lastname = "lastname"
  email = "email"
  repeatEmail = "repeatEmail"
  telephoneNumber = "telephoneNumber"
  repeatTelephoneNumber = "repeatTelephoneNumber"
  publishedDetails = "publishedDetails"
  privacyPolicyConsent = "privacyPolicyConsent"
  termsOfServiceConsent = "termsOfServiceConsent"
  spokenLanguages = "spokenLanguages"
}

interface FormControls {
  firstname: FormControl<string>
  lastname: FormControl<string>
  email: FormControl<string>
  repeatEmail: FormControl<string>
  telephoneNumber: FormControl<Nullable<string>>
  repeatTelephoneNumber: FormControl<Nullable<string>>
  spokenLanguages: FormControl<ReadOnlyLanguage[]>
  publishedDetails: FormControl<PublishedContactDetailSettings>
  privacyPolicyConsent: FormControl<boolean>;
  termsOfServiceConsent: FormControl<boolean>
}

export interface CreateAdvertisementContactFormResult {
  contact: Nullable<Contact>
  publishedContactDetailsSettings: Nullable<PublishedContactDetailSettings>
  spokenLanguages: Nullable<ReadOnlyLanguage[]>
  isValid: boolean
}

@Component({
  selector: 'app-create-advertisement-contact-form',
  templateUrl: './create-advertisement-contact-form.component.html',
  styleUrls: ['./create-advertisement-contact-form.component.scss']
})
export class CreateAdvertisementContactFormComponent {
  formControlNames = new ContactFormControlNames()
  formGroup: FormGroup<FormControls>;

  constructor(private fb: FormBuilder,
              private projectService: ProjectService) {
    this.formGroup = this.createContactFormFromFormControls(this.createFormControls())
  }

  private createFormControls(): FormControls {
    return {
      firstname: this.fb.nonNullable.control('', [
        Validators.required,
        RxwebValidators.notEmpty(),
        Validators.maxLength(FIRSTNAME_MAX_LENGTH)
      ]),
      lastname: this.fb.nonNullable.control('', [
        Validators.required,
        RxwebValidators.notEmpty(),
        Validators.maxLength(LASTNAME_MAX_LENGTH)
      ]),
      email: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(EMAIL_MAX_LENGTH)
      ]),
      repeatEmail: this.fb.nonNullable.control(
        '',
        [Validators.required, RxwebValidators.compare({fieldName: this.formControlNames.email})]
      ),
      telephoneNumber: this.fb.control(null, [
        phoneNumberValidator,
        Validators.maxLength(PHONE_NUMBER_MAX_LENGTH)
      ]),
      repeatTelephoneNumber: this.fb.control(
        null,
        [RxwebValidators.compare({fieldName: this.formControlNames.telephoneNumber})]
      ),
      spokenLanguages: this.fb.nonNullable.control([]),
      publishedDetails: this.fb.nonNullable.control({
        firstname: true,
        email: false,
        lastname: false,
        telephoneNumber: false
      }),
      privacyPolicyConsent: this.fb.nonNullable.control(false, [Validators.requiredTrue]),
      termsOfServiceConsent: this.fb.nonNullable.control(false, [Validators.requiredTrue])
    }
  }

  private createContactFormFromFormControls(formControls: FormControls): FormGroup<FormControls> {
    return this.fb.group(formControls)
  }

  private currentContact(): Contact {
    return {
      firstname: this.formGroup.value.firstname,
      lastname: this.formGroup.value.lastname,
      email: this.formGroup.value.email,
      telephoneNumber: this.formGroup.value.telephoneNumber
    }
  }

  get privacyPolicyUrl$() : Observable<string> {
    return this.projectService.routeRelativeToCurrentProject$('privacy-policy')
  }

  get termsOfServicesUrl$() : Observable<string> {
    return this.projectService.routeRelativeToCurrentProject$('terms-of-services')
  }

  get publishedContactDetailsSettingsComponentSettings(): PublishedContactDetailsSettingsComponentSettings {
    //As component defaults all settings to true, there's no need to change anything else,
    // otherwise we would need to add settings for other fields, which allows both, show and edit
    return {firstname: {show: true, editable: false}}
  }

  getResult(): CreateAdvertisementContactFormResult {
    const isValid = this.formGroup.valid
    return <CreateAdvertisementContactFormResult>{
      contact: isValid ? this.currentContact() : null,
      publishedContactDetailsSettings: isValid ? this.formGroup.value.publishedDetails : null,
      spokenLanguages: isValid ? this.formGroup.value.spokenLanguages : null,
      isValid
    }
  }

    protected readonly EMAIL_MAX_LENGTH = EMAIL_MAX_LENGTH;
}
