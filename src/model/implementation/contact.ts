import { Model } from 'logofx/model';
import { IContact } from "../contracts/contact";
import { ValidationRules } from 'aurelia-validation';

/**
 * The Contact
 */
export class Contact extends Model<string> implements IContact {

  public name: string;

  constructor () {
    super();

    this.rules = ValidationRules
        .ensure((c: Contact) => c.name).displayName('Name').required().withMessage('The value is mandatory')
        .ensure((c: Contact) => c.name).displayName('Email').email()
        .ensure((c: Contact) => c.name).displayName('Phone').required().maxLength(12).withMessage('The value is mandatory. The length must be between 9 and 12')
        .rules;
  }

}
