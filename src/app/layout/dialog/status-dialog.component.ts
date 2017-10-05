import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {DialogViewModel} from "../../shared/viewmodels/DialogViewModel";

@Component({
  selector: 'status-dialog',
  templateUrl: './status-dialog.component.html'
})

export class StatusDialogComponent {
  public objectViewModel: ObjectViewModel[] = [];

  constructor(public dialogRef: MdDialogRef<StatusDialogComponent>,
              @Inject(MD_DIALOG_DATA)
              public data: DialogViewModel = new DialogViewModel()) {
    if (data && data.subModel)
      this.convertToObjectArray(data.subModel)
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  // Push key/value-pairs of anonymous objects in 'data.subModel' (including nested objects) -->
  // to 'ObjectViewModel' array to iterate in *ngFor
  private convertToObjectArray(model: any): void {
    for (let _key in model) {
      if (model.hasOwnProperty(_key))
        if (model[_key] instanceof Array || model[_key] instanceof Object) {
          for (let __key in model[_key])
            if (model[_key].hasOwnProperty(__key))
              this.objectViewModel.push({
                key: __key,
                value: model[_key][__key]
              });
        } else this.objectViewModel.push({key: _key, value: model[_key]})
    }
  }
}

export class ObjectViewModel {
  key: any = null;
  value: any = null;
}
