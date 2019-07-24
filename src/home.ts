import { MDCSelect } from '@material/select';
import { MDCSlider } from '@material/slider';
import { iconCssClasses } from '@material/textfield';
import {icon} from './resources/icon';
import { routeConfig } from './resources/aurelia-router-metadata';
import { PLATFORM } from 'aurelia-framework';

@icon('home')
//@routeConfig({ route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('home'), nav: true, title: 'Home', settings: { icon: 'home' } })
export class Home {

  value:number = 50;
  
  attached() {
    console.log('Home is attached.')
    //document.querySelectorAll('.mdc-select').forEach(t => new MDCSelect(t));
    // document.querySelectorAll('.mdc-slider').forEach(t => {
    //   const slider = new MDCSlider(t);
    // });
  }
}
