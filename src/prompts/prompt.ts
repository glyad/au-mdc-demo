import { DialogController } from "aurelia-dialog";
import { autoinject } from "aurelia-framework";


@autoinject
export class Prompt {

  constructor(private controller: DialogController){   
    this.controller = controller;          
  }

  
  
    person = { firstName: '' };
  
    activate(person){
      this.person = person;
  }
}
