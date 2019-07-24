import { IEditableModel } from 'logofx/model';
import { jsonClone } from 'utils';

export abstract class EditableObjectViewModel<T extends IEditableModel<string>>  {

    constructor(private _model: T) {
        console.log("EditableObjectViewModel ctor.");
        this.originalModel = _model;
        this.copyModel(_model);
        //this.originalModel.validationRules = rules;
    }

    private copyModel(model: T) {
      let rules = model.validationRules; 
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
    
    model: T;   
    originalModel: T; 
    CanCancelChanges: boolean;            

    cancelEdit() {
        this.copyModel(this.originalModel);
        this.discard(this.model);
    }

    endEdit() {
        this.save(this.model).then(() => {
          //this.IsDirty = false;
          //TODO: For some unknown reason the following line
          //fails to work - restore when the reason is clear
          //this.model.CleanDirty();
          this.isDirty = false;
          this.afterSave(this.model);
        }, this.showError);
    }

    protected async abstract save(model: T);

    protected async afterSave(model: T) {

    }

    protected abstract discard(model: T);

    protected async abstract showError(error: any);
}
