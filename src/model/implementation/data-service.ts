import { ContactDto, ContactProvider } from 'data';
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

  public async getContact(id: string): Promise<IContact> {
    return new Promise<IContact>(async resolve => {
      const contactDtos: ContactDto[] = await this.contactProvider.getAsync(id);
      const contact: IContact = new Contact();
      contact.id = contactDtos[0].id;
      contact.firstName = contactDtos[0].firstName;
      contact.lastName = contactDtos[0].lastName;
      contact.email = contactDtos[0].email;
      contact._rev = contactDtos[0]._rev;
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
    const dto: ContactDto = new ContactDto();
    dto.id = model.id;
    dto.firstName = model.firstName;
    dto.lastName = model.lastName;
    dto.email = model.email;
    if (!model.isNew) {
      dto._rev = model._rev;
      await this.contactProvider.putAsync(dto)
              .then(() => this.updateLocalContacts())
              .catch(error => {
                throw error;
              });
    } else {
      await this.contactProvider.postAsync(dto)
              .then(() => this.updateLocalContacts())
              .catch(error => {
                throw error;
              });
    }

    return this.contacts.find(c => c.id === model.id);
  }

  public async deleteContact(model: IContact): Promise<void> {
      await this.contactProvider
        .deleteAsync(model.id)
        .then(async () => {
          await this.updateLocalContacts();
        })
        .catch(err => {
            throw err;
        });
  }

  private async updateLocalContacts(): Promise<void> {
    this.contacts.splice(0, this.contacts.length);

    (await this.contactProvider.getAsync()).forEach(dto => {
      const model: IContact = new Contact();
      model.id = dto.id;
      model.firstName = dto.firstName;
      model.lastName = dto.lastName;
      model.email = dto.email;
      model._rev = dto._rev;
      this.contacts.push(model);
    });

  }
}
