// tslint:disable: no-floating-promises
// tslint:disable: no-parameter-properties

import { DialogController, DialogService, DialogCancelableOperationResult } from 'aurelia-dialog';
import { ObjectViewModel, EditableObjectViewModel } from 'logofx';
import { IContact, Contact as ContactModel } from 'model';
import { autoinject } from 'aurelia-framework';
import { MdcValidationRenderer } from 'resources/mdc-components';
import { resolve } from 'path';

/**
 * Represents Contact view model.
 */
@autoinject
export class Contact extends EditableObjectViewModel<ContactModel> {

  constructor(model: ContactModel, private dialogService: DialogService) {
    super(model);

    this.validationController.addRenderer(new MdcValidationRenderer());
    this.model.beginEdit();
  }

  public get canExecuteOk(): boolean {
    return this.validationController.errors.length === 0 && this.model.isDirty;
  }

  public ok(): void {
    this.validationController.validate().then(validation => {
      if (validation.valid) {
        this.save(this.model)
          .then(() => this.dialogService.controllers[0].ok(this.model));
      }
    });
  }

  public cancel(): void {
    this.model.cancelEdit();
    this.dialogService.controllers[0].cancel();
  }

  protected async save(model: ContactModel): Promise<any> {
    alert('saved! ' + this.model.toString());
  }
  protected afterSave(model: ContactModel): Promise<any> {
    throw new Error("Method not implemented.");
  }
  protected discard(model: ContactModel): Promise<any> {
    throw new Error("Method not implemented.");
  }
  protected showError(error: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
