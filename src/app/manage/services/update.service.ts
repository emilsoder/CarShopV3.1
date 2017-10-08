import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material";
import {ICar} from "../../shared/interfaces/ICar";
import {UpdateDialogComponent} from "../components/update-dialog/update-dialog.component";
import {ManageService} from "./manage.service";
import {Subscription} from "rxjs/Subscription";
import {Response} from "@angular/http";
import {StatusDialogComponent} from "../../layout/dialog/status-dialog.component";

@Injectable()
export class UpdateService {

  constructor(public manageService: ManageService,
              public dialog: MatDialog) {
  }

  public openDialog(_car: ICar): Subscription {
    let dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: 'auto',
      data: _car
    });

    return dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.updateCar(result)
    });
  }

  public updateCar(car: ICar): Subscription {
    return this.manageService.updateCar(car).subscribe(response => {
      this.createStatusDialogModel(response);
    }, (error2 => {
      console.log(error2);
      return this.createStatusDialogModel(null);
    }));
  }

  public createStatusDialogModel(response: Response): void {
    let model: object = {};
    if (!response) {
      model = {
        title: "Something went wrong!",
        message: "Request to update car failed. Please see error message below."
      }
    } else {
      model = {
        title: response.ok
          ? "Success!"
          : "Something went wrong!",
        subModel: response.ok
          ? response.json() as ICar
          : response.json(),
        message: response.ok
          ? "Car was successfully updated"
          : "Request to update car failed."
      }
    }
    this.openStatusDialog(model);
  }

  public openStatusDialog(data: object): void {
    this.dialog.open(StatusDialogComponent, {
      width: 'auto',
      data: data
    });
  }
}
