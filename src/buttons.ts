import { DialogService } from 'aurelia-dialog';
import { MDCDialog } from '@material/dialog';
import { autoinject, PLATFORM } from 'aurelia-framework';
import { Prompt } from './prompts/prompt';
import { icon } from 'resources/icon';
import { routeConfig } from './resources/aurelia-router-metadata';

@autoinject
@icon('send')
@routeConfig({ route: 'buttons', name: 'buttons', moduleId: PLATFORM.moduleName('buttons'), nav: true, title: 'Buttons', settings: { icon: 'send' } })
export class Buttons {

  private dialog: MDCDialog;


  constructor(private dialogService: DialogService) {}

  attached() {
    console.log('Buttons is attached');


    this.dialog = new MDCDialog(document.querySelector('.mdc-dialog'));


  }

  person = {
    firstName: 'Wade',
    middleName: 'Owen',
    lastName: 'Watts'
  };

  openDialog2() {
    this.dialogService.open({
      viewModel: Prompt,
      model: this.person
    }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('good - ', response.output);
      } else {
        console.log('bad');
      }
      console.log(response.output);
    });
  }

  openDialog() {
    this.dialog.open();
  }
}
