
import { ContactDto } from '../../dto';

export interface IContactProvider {

  get(id?: string): ContactDto[];
  getAsync(id?: string): Promise<ContactDto[]>;
  post(contactDto: ContactDto): void;
  put(contactDto: ContactDto): void;
  patch(contactDto: ContactDto): void;
  delete(id?: string): void;
}
