import {Component, Inject, OnInit} from '@angular/core';
import {AdvertisementResponse} from "../../../models/advertisement/advertisement-response";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ConfirmationDialogResult} from "../../../models/common/dialogResults";
import {requireDefinedNotNull} from "../../../shared/assertions/object-assertions";
import {map} from "rxjs";
import {EMAIL_MAX_LENGTH} from "../../../validators/contact-validators";
import {
  ADVERTISER_NOTE_MAX_LENGTH,
  RESPONDER_NOTE_MAX_LENGTH
} from "../../../validation/constants/advertisement-validation.constants";

interface AdvertisemntResponseAcceptFormCotnrols {
  note: FormControl<string>
}

export interface AdvertisementResponseAcceptDialogResult {
  dialogResult: ConfirmationDialogResult
  note?: string
}

@Component({
  selector: 'app-advertisement-response-accept-dialog',
  templateUrl: './advertisement-response-accept-dialog.component.html',
  styleUrls: ['./advertisement-response-accept-dialog.component.scss']
})
export class AdvertisementResponseAcceptDialogComponent implements OnInit {

  private _form?: FormGroup<AdvertisemntResponseAcceptFormCotnrols>

  get form(): FormGroup<AdvertisemntResponseAcceptFormCotnrols> {
    return requireDefinedNotNull(this._form);
  }

  set form(value: FormGroup<AdvertisemntResponseAcceptFormCotnrols>) {
    this._form = value;
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data: AdvertisementResponse,
              private matDialogRef: MatDialogRef<AdvertisementResponseAcceptDialogComponent, AdvertisementResponseAcceptDialogResult>,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      note: ['']
    })
    this.matDialogRef.beforeClosed()
      //When dialog was closed without submit, setup result to failed
      .pipe(map(result => result?.dialogResult ? result.dialogResult : {result: ConfirmationDialogResult.CANCEL}))
  }


  submit(form: FormGroup<AdvertisemntResponseAcceptFormCotnrols>) {
    this.matDialogRef.close({
      dialogResult: ConfirmationDialogResult.CONFIRMED,
      note: form.value.note
    })
  }

  close() {
    this.matDialogRef.close({
      dialogResult: ConfirmationDialogResult.CANCEL
    })
  }

  protected readonly EMAIL_MAX_LENGTH = EMAIL_MAX_LENGTH;
  protected readonly ADVERTISER_NOTE_MAX_LENGTH = ADVERTISER_NOTE_MAX_LENGTH;
}
