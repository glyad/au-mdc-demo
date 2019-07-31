import { Rule, FluentRuleCustomizer } from 'aurelia-validation';
import { makeString } from 'logofx';
import { deepClone } from 'logofx/utils';

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

  isNew: boolean;

  beginEdit(): void;

  cancelEdit(): void;

  commitEdit(): void;

}

/**
 * Model
 */
export class Model<T> implements IModel<T> {

    public id: T;

    //Made public for seralization during cloning/spreading
    public validationRules: FluentRuleCustomizer<IModel<T>, any>;
    private _rules: Rule<{}, any>[][];

    public get rules(): Rule<{}, any>[][] {
        return this._rules;
    }

    public set rules(value: Rule<{}, any>[][]) {
        if (value === this._rules) {
            return;
        }

        this._rules = value;
    }

    public toString(): string {
        return makeString(this);
    }
}

/**
 * EditableModel
 */
export class EditableModel<T> extends Model<T> implements IEditableModel<T> {

  private _newGuard: boolean;
  private _isDirty: boolean = false;
  private _isNew: boolean = false;
  private _originalState: IEditableModel<T>;

  constructor() {
    super();

    // Object.keys(this).forEach(key => getDefaultBindingEngine().propertyObserver(this, key)
    //   .subscribe((newValue, oldValue)=>{
    //     if (newValue !== oldValue) {
    //       this.isDirty = true;
    //     }
    //   }));

  }

  public get isNew(): boolean {
    return this._isNew;
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

  public beginEdit(): void {
    //if (!this.isNew)
      this._originalState = this.clone(this);
      console.log(`Original is ` + this._originalState.toString());
      console.log(`This is ` + this.toString());
  }

  public cancelEdit(): void {
    //this = this.clone(this._originalState);
  }
  public commitEdit(): void {
    this.cleanDirty();
    //throw new Error("Method not implemented.");
  }

  protected makeNew(): void {
    if (!this._newGuard) {
      this._newGuard = this._isNew = true;
    }
  }

  private clone(model: IEditableModel<T>): IEditableModel<T> {
    return deepClone(model);
  }
}
