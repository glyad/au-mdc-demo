import { IModel, ObjectViewModel, IObjectWrapper } from "logofx";
import { ValidationController, ValidationControllerFactory } from "aurelia-validation";
import { Container, bindable } from "aurelia-framework";
import { inherits, isNullOrUndefined } from "util";
import { isClassOrTypeElement } from "typescript";

export abstract class ScreenObjectViewModel<T extends IModel<any>> implements IObjectWrapper<T> {
  
  @bindable()
    public model: T;
    private _isSelected: boolean = false;
    private _isEnabled: boolean = true;
    public controller: ValidationController;


    constructor(model: T) {
        this.model = model;
        let controllerFactory: ValidationControllerFactory = Container.instance.get(ValidationControllerFactory);
        this.controller = controllerFactory.createForCurrentScope();
    }
      
    public get isSelected(): boolean {
        return this._isSelected;
    }

    public set isSelected(value: boolean) {
        if (this._isSelected === value)
            return;
        
        this._isSelected = value;
    }

    public get isEnabled(): boolean {
        return this._isEnabled;
    }

    public set isEnabled(value: boolean) {
        if (this._isEnabled === value) {
            return;
        }
        this._isEnabled = value;        
    }
  
  public abstract activate(params, routeConfig, navigationInstruction) : void;
}
