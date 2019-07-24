import { MDCHook } from 'resources/mdc-components/mdc-hook';
import {Aurelia, Controller} from 'aurelia-framework'
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import { RouterMetadataSettings } from "./resources/aurelia-router-metadata";


const hook: MDCHook = new MDCHook();

    Controller.prototype.attached = function(){
      console.log('before attached');
      if (this.isAttached) {
        return;
      }
  
      this.isAttached = true;
  
      if (this.behavior.handlesAttached) {
        this.viewModel.attached();
      }
  
      if (this.view !== null) {
        this.view.attached();
        hook.beforeBind(this.view);
      }

      
      console.log('after attached');
    }

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-dialog'), (configuration) => {
      // use only attach-focus
      configuration.useResource('attach-focus');
      configuration.useDefaults();
      configuration.settings.lock = true;
      configuration.settings.centerHorizontalOnly = false;
      configuration.settings.startingZIndex = 10;
      configuration.settings.keyboard = true;
    })
    // .plugin(PLATFORM.moduleName('resources/aurelia-router-metadata'), (settings: RouterMetadataSettings) => {
    //   settings.routerConfiguration.title = "Foo";
    //   settings.enableStaticAnalysis = true;
    //   settings.enableEagerLoading = true;
    // })
    
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }
  

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
