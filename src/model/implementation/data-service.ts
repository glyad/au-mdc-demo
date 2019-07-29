import { IDataService, IContact } from '../contracts/index';
import { Contact } from '.';

/**
 * DataService
 */
export class DataService implements IDataService {

  public contacts: IContact[];

  public getContacts(): void {
    this.contacts.slice(0, this.contacts.length);

    this.contacts.push(new Contact());
  }
}
