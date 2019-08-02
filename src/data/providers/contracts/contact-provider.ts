import { ContactDto } from 'dto';

export interface IContactProvider {

  getAsync(id?: string): Promise<ContactDto[]> | Promise<ContactDto>;
  postAsync(contactDto: ContactDto): Promise<void>;
  putAsync(contactDto: ContactDto): Promise<void>;
  deleteAsync(id?: string): Promise<void>;
}
