import { Rule, FluentRuleCustomizer } from 'aurelia-validation';
import { makeString } from 'logofx';

export interface IModel<T> {
    id: T;

    validationRules: FluentRuleCustomizer<IModel<T>, any>;

    rules: Rule<{}, any>[][];
}

export interface ICanBeDirty {

    isDirty: boolean;

    makeDirty(): void;

    cleanDirty(): void;

}

export interface IEditableModel<T> extends IModel<T>, ICanBeDirty {

}

export class Model<T> implements IModel<T> {
    
    id: T;

    //Made public for seralization during cloning/spreading
    public validationRules: FluentRuleCustomizer<IModel<T>, any>;
    private _rules: Rule<{}, any>[][];        

    public get rules(): Rule<{}, any>[][] {
        return this._rules;
    }

    public set rules(value: Rule<{}, any>[][]) 
    {
        if (value === this._rules) {
            return;
        }

        this._rules = value;
    }

    toString(): string {
        return makeString(this);
    }
}

export class EditableModel<T> extends Model<T> implements IEditableModel<T> {
  
  private _isDirty: boolean = false;

  constructor() {
    super();

    // Object.keys(this).forEach(key => getDefaultBindingEngine().propertyObserver(this, key)
    //   .subscribe((newValue, oldValue)=>{
    //     if (newValue !== oldValue) {
    //       this.isDirty = true;
    //     }
    //   }));
      
  }

  public get isDirty(): boolean {
    return this._isDirty;
  }

  public makeDirty(): void {
    this._isDirty = true;
  }
  
  public cleanDirty(): void {
    this._isDirty = false;
  }  
}



