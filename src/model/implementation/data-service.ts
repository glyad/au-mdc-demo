import { ContactProvider, ContactDto } from 'data';
import { IDataService, IContact } from 'model';
import { Contact } from '.';
import { Guid } from 'logofx';
import { autoinject } from 'aurelia-framework';

/**
 * DataService
 */
@autoinject
export class DataService implements IDataService {

  public contacts: IContact[] = [];

  // tslint:disable-next-line: no-parameter-properties
  constructor(private contactProvider: ContactProvider) {
      //this.updateLocalContacts().then().catch();
  }

  public async createContact(): Promise<IContact> {
    // tslint:disable-next-line: completed-docs
    class NewContact extends Contact {
      constructor (id: string) {
        super();

        this.id = id;
        this.makeNew();
      }
    }

    return new Promise<IContact>(resolve => {
      const contact = new NewContact(Guid.create().toString());
      resolve(contact);
    });
  }

  public async getContacts(): Promise<IContact[]> {
    await this.updateLocalContacts();
    return new Promise(resolve => {
      resolve(this.contacts);
    });
  }

  public async updateContact(model: IContact): Promise<IContact> {
    if (model.isNew) {
      const dto: ContactDto = new ContactDto();
      dto.id = model.id;
      dto.firstName = model.firstName;
      dto.lastName = model.lastName;
      dto.email = model.email;

      this.contactProvider.post(dto);
    }
    await this.updateLocalContacts();
    return new Contact();
  }

  public async deleteContact(model: IContact): Promise<void> {
    return new Promise(resolve => {
      resolve(null);
    });
  }

  private async updateLocalContacts(): Promise<void> {
    this.contacts.splice(0, this.contacts.length);

    (await this.contactProvider.getAsync()).forEach(dto => {
      const model: Contact = new Contact();
      model.id = dto.id;
      model.firstName = dto.firstName;
      model.lastName = dto.lastName;
      model.email = dto.email;

      this.contacts.push(model);
      //alert(JSON.stringify(this.contacts));
    });

  }
}
