import { ObjectViewModel } from 'logofx';
import { DialogController } from "aurelia-dialog";
import { autoinject } from "aurelia-framework";
import { DataService, Contact } from "model";

/**
 * Edit Contact view model
 */
@autoinject
export class EditContact extends ObjectViewModel<Contact> {

  // tslint:disable-next-line: no-parameter-properties
  constructor(model: Contact,  private dialogController: DialogController) {
    super(model);
    console.log(model);
  }

  public ok(): void {
    // tslint:disable: no-floating-promises
    this.dialogController.ok(this.model);
  }

  public cancel(): void {
    this.dialogController.cancel();
  }
  // public activate(model: any): void {
  //   this.model = model;
  // }
}
