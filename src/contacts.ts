import { WrappingCollection } from './logofx/view-model/WrappingCollection';
// tslint:disable: no-floating-promises
import { Contact as ContactViewModel } from './contact';
import { WindowManager } from './logofx/ui-services/window-manager';
import { Contact, DataService } from 'model';
import { ViewModelCreatorService, Guid } from 'logofx';
import { EditContact } from './edit-contact';
import { autoinject, transient, View } from "aurelia-framework";
import { DialogService, DialogController } from "aurelia-dialog";

/**
 * Contacts view model.
 */
@autoinject
@transient(Contacts)
export class Contacts {

  private _wcContacts: WrappingCollection;

  // tslint:disable: no-parameter-properties
  constructor(private dataService: DataService,
              private windowManager: WindowManager,
              private viewModelCreatorService: ViewModelCreatorService) {  }

  public created(owningView: View, myView: View): void {
    this.dataService.getContacts().then(contacts => {
      this._wcContacts = new WrappingCollection(
        item => this.viewModelCreatorService.create<ContactViewModel>(ContactViewModel, item),
        this.dataService.contacts);
    });
  }

  public get contacts(): WrappingCollection {

    return this._wcContacts;
  }

  /**
   * Opens the dialog for editing new contact item.
   */
  public async createNewContact(): Promise<any> {

    const contact: Contact = await this.dataService.createContact() as Contact;

    await this.windowManager.show(this.viewModelCreatorService.create<ContactViewModel>(ContactViewModel, contact))
                            .then(a => {
                              // Do something miningfull here
                              //alert(`Was Cancelled? The answer is ${a.wasCancelled}`);
                            })
                            .catch(err => {
                              //alert(err);
                            })
                            .finally(() => {
                              // alert('Всё заебись!');
                            });

    // const r = await this.windowManager.show(this.viewModelCreatorService.create<ContactViewModel>(ContactViewModel, contact));
    // alert(r.output);
    // alert('Продолжаем жить дальше!');
  }
}
