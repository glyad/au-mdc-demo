import { IContact } from "./contact";

export interface IDataService {

  contacts: IContact[];

  createContact(): Promise<IContact>;
  getContacts(): Promise<IContact[]>;
  updateContact(model: IContact): Promise<IContact>;
  deleteContact(model: IContact): Promise<void>;
}
