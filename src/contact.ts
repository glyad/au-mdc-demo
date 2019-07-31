// tslint:disable: no-floating-promises
// tslint:disable: no-parameter-properties

import { DialogController, DialogService, DialogCancelableOperationResult } from 'aurelia-dialog';
import { ObjectViewModel, EditableObjectViewModel } from 'logofx';
import { IContact, Contact as ContactModel, DataService } from 'model';
import { autoinject, transient } from 'aurelia-framework';
import { MdcValidationRenderer } from 'resources/mdc-components';
import { resolve } from 'path';

/**
 * Represents Contact view model.
 */
@autoinject
@transient(Contact)
export class Contact extends EditableObjectViewModel<ContactModel> {

  constructor(model: ContactModel, private dataService: DataService,  private dialogService: DialogService) {
    super(model);

    this.validationController.addRenderer(new MdcValidationRenderer());
    this.beginEdit();
  }

  public get canExecuteOk(): boolean {
    return this.validationController.errors.length === 0 && this.model.isDirty;
  }

  public ok(): void {
    this.endEdit();
  }

  public cancel(): void {
    this.model.cancelEdit();
    this.dialogService.controllers[0].cancel();
  }

  protected async save(model: ContactModel): Promise<any> {
    //throw new Error('HUJNYA');

    await this.dataService.updateContact(model);
    //alert('saved! ' + this.model.toString());
  }
  protected async afterSave(model: ContactModel): Promise<any> {
    return this.dialogService.controllers[0].ok(this.model);
  }
  protected async discard(model: ContactModel): Promise<any> {
    throw new Error("Method not implemented.");
  }
  protected async showError(error: any): Promise<any> {
    alert(error.message);
  }
}
