import { Container } from 'aurelia-framework';
import { ValidationController, ValidationControllerFactory } from 'aurelia-validation';
import { IModel } from './../model';
import { bindable } from 'aurelia-framework';

export interface IObjectWrapper<T extends IModel<any>> {

    model: T;
}

export interface IObjectViewModel<T extends IModel<any>> extends IObjectWrapper<T> {

  isSelected: boolean;

  isEnabled: boolean;

}
export abstract class ObjectViewModel<T extends IModel<any>> implements IObjectViewModel<T> {
    
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

} 


