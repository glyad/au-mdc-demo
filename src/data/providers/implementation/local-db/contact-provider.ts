import { DB_NAME } from './index';
import { IContactProvider, ContactDto } from 'data';
//import { defaults as PouchDB } from 'pouchdb-browser';

/**
 * ContactProvider
 */
export class ContactProvider implements IContactProvider {

  public get(id?: string): ContactDto[] {
    const contacts: ContactDto[] = new Array<ContactDto>();
    const PouchDB = require('pouchdb-browser').default;
    const db = new PouchDB(DB_NAME);

    db.allDocs({
      include_docs: true,
      attachments: true})
      .then(result => {

        (<any[]>result.rows).forEach(row => {
          const contactDto: ContactDto = new ContactDto();
          contactDto.id = row.doc.id;
          contactDto.firstName = row.doc.firstName;
          contactDto.lastName = row.doc.lastName;
          contactDto.email = row.doc.email;
          //alert(JSON.stringify(contactDto));
          contacts.push(contactDto);
        });
      })
      .catch(alert);
    //alert(JSON.stringify(contacts));
    return contacts;
  }

  public async getAsync(id?: string): Promise<ContactDto[]> {
    const contacts: ContactDto[] = new Array<ContactDto>();
    const PouchDB = require('pouchdb-browser').default;
    const db = new PouchDB(DB_NAME);
    await db.allDocs({
      include_docs: true,
      attachments: true})
      .then(result => {

        (<any[]>result.rows).forEach(row => {
          const contactDto: ContactDto = new ContactDto();
          contactDto.id = row.doc.id;
          contactDto.firstName = row.doc.firstName;
          contactDto.lastName = row.doc.lastName;
          contactDto.email = row.doc.email;
          //alert(JSON.stringify(contactDto));
          contacts.push(contactDto);
        });
      })
      .catch(alert);

    return contacts;
  }

  public post(contactDto: ContactDto): void {
    const PouchDB = require('pouchdb-browser').default;
    const db = new PouchDB(DB_NAME);
    db.put({
      _id: contactDto.id,
      id: contactDto.id,
      firstName: contactDto.firstName,
      lastName: contactDto.lastName,
      email: contactDto.email
    })
      .then(response => {
        alert(`Responce ID is ${response.id}.\n Revision: ${response.rev}.`);
      }).catch (reason => {
        alert(`Reason is ${reason}`);
      });
  }

  public put(contactDto: ContactDto): void {
    const PouchDB = require('pouchdb-browser').default;
    const db = new PouchDB(DB_NAME);
    db.get(contactDto.id).then(doc => {
      return db.put({
        _id: contactDto.id,
        _rev: doc._rev,
        id: contactDto.id,
        firstName: contactDto.firstName,
        lastName: contactDto.lastName,
        email: contactDto.email
      });
    }).then(response => {
      // handle response
    }).catch(err => {
      console.log(err);
    });
  }

  public patch(contactDto: ContactDto): void {
    throw new Error("Method not implemented.");
  }

  public delete(id ? : string): void {
    throw new Error("Method not implemented.");
  }
}
