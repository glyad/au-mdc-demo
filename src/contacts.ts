// tslint:disable: no-floating-promises
import { Contact as ContactViewModel } from './contact';
import { WindowManager } from './logofx/ui-services/window-manager';
import { Contact } from 'model';
import { ViewModelCreatorService } from 'logofx';
import { EditContact } from './edit-contact';
import { autoinject } from "aurelia-framework";
import { DialogService, DialogController } from "aurelia-dialog";

/**
 * Contacts view model.
 */
@autoinject
 export class Contacts {

  // tslint:disable: no-parameter-properties
  constructor(private windowManager: WindowManager,
              private viewModelCreatorService: ViewModelCreatorService) {}

  /**
   * Opens the dialog for editing new contact item.
   */
  public async createNewContact(): Promise<any> {

    const contact: Contact = new Contact();
    contact.id = '001';
    contact.name = 'Vasya';

    await this.windowManager.show(this.viewModelCreatorService.create<ContactViewModel>(ContactViewModel, contact))
                            .then(a => {
                              // Do something miningfull here
                              alert(`Was Cancelled? The answer is ${a.wasCancelled}`);
                            })
                            .catch(err => {
                              alert(err);
                            })
                            .finally(() => {
                              alert('Всё заебись!');
                            });

    // const r = await this.windowManager.show(this.viewModelCreatorService.create<ContactViewModel>(ContactViewModel, contact));
    // alert(r.output);
    alert('Продолжаем жить дальше!');
  }
}
