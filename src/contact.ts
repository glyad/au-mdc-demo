// tslint:disable: no-floating-promises
// tslint:disable: no-parameter-properties

import { DialogController, DialogService, DialogCancelableOperationResult } from 'aurelia-dialog';
import { ObjectViewModel } from 'logofx';
import { IContact, Contact as ContactModel } from 'model';
import { autoinject } from 'aurelia-framework';

/**
 * Represents Contact view model.
 */
@autoinject
export class Contact extends ObjectViewModel<ContactModel> {

  private _dialogController: DialogController;

  constructor(model: ContactModel, private dialogService: DialogService) {
    super(model);

    console.log(`Contact - ${model.name}`);
  }

  public ok(): void {
    this.dialogService.controllers[0].ok(this.model);
  }

  public cancel(): void {
    this.dialogService.controllers[0].cancel();
  }
}
