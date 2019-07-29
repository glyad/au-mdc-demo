// tslint:disable: member-ordering
import { IEditableModel } from 'logofx/model';
import { jsonClone } from 'logofx/utils';
import { ObjectViewModel } from './objectViewModel';

/**
 * EditableObjectViewModel
 */
export abstract class EditableObjectViewModel<T extends IEditableModel<string>> extends ObjectViewModel<T> {
    private originalModel: T;

    // tslint:disable: no-parameter-properties
    constructor(private _model: T) {
      super(_model);
      console.log("EditableObjectViewModel ctor.");
      this.originalModel = _model;
      this.copyModel(_model);
    }

    private copyModel(model: T): void {
      const rules = model.validationRules;
      model.validationRules = null;
      this.model = jsonClone(model);
      this.model.validationRules = rules;
      this.model.validationRules.on(this.model);
      model.validationRules = rules;
  }

    get isDirty(): boolean {
      return this.model.isDirty;
    }
    set isDirty(value: boolean) {
          //TODO: For some unknown reason the following line
          //fails to work - restore when the reason is clear
          //value ? this.model.makeDirty() : this.model.cleanDirty();
          this.model.isDirty = value;
    }

    public canCancelChanges: boolean;

    public cancelEdit(): void {
        this.copyModel(this.originalModel);
        this.discard(this.model);
    }

    public endEdit(): void {
        this.save(this.model).then(() => {
                                   //TODO: For some unknown reason the following line
                                   //fails to work - restore when the reason is clear
                                   //this.model.CleanDirty();
                                   this.isDirty = false;
                                   // tslint:disable-next-line: no-floating-promises
                                   this.afterSave(this.model);
                            },     this.showError);
    }

    protected async abstract save(model: T): Promise<any>;

    protected async abstract afterSave(model: T): Promise<any>;

    protected async abstract discard(model: T): Promise<any>;

    protected async abstract showError(error: any): Promise<any>;
}
