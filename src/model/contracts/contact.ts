import { IModel } from 'logofx/Model';

export interface IContact extends IModel<string> {
  name: string;
}
