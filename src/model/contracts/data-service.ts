import { IContact } from "./contact";

export interface IDataService {

  contacts: IContact[];

  getContacts(): void;
}
