// tslint:disable: no-floating-promises
// tslint:disable: no-parameter-properties

import { DialogController, DialogService, DialogCancelableOperationResult } from 'aurelia-dialog';
import { ObjectViewModel } from 'logofx';
import { IContact, Contact as ContactModel } from 'model';
import { autoinject } from 'aurelia-framework';
import { MdcValidationRenderer } from 'resources/mdc-components';

/**
 * Represents Contact view model.
 */
@autoinject
export class Contact extends ObjectViewModel<ContactModel> {

  constructor(model: ContactModel, private dialogService: DialogService) {
    super(model);

    this.validationController.addRenderer(new MdcValidationRenderer());
  }

  public ok(): void {
    this.validationController.validate().then(validation => {
      if (validation.valid) {
        this.dialogService.controllers[0].ok(this.model);
      }
    });
  }

  public cancel(): void {
    this.dialogService.controllers[0].cancel();
  }
}
