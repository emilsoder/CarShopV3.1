import {Component, OnDestroy, OnInit} from '@angular/core';
import {ManageService} from "../../services/manage.service";
import {ICar} from "../../../shared/interfaces/ICar";
import {MatDialog} from "@angular/material";
import {Subscription} from "rxjs/Subscription";
import {UpdateService} from "../../services/update.service";

@Component({
  selector: 'manage-update',
  templateUrl: './update.component.html'
})

export class UpdateComponent implements OnInit, OnDestroy {
  public data: Object[];
  public selectionMode;
  private subscriptions: Subscription[] = [];

  constructor(private manageService: ManageService,
              public dialog: MatDialog,
              private updateService: UpdateService) {
  }

  ngOnInit(): void {
    this.selectionMode = {selectionMode: ["row"]};
    this.getCars();
  }

  getCars(): void {
    let sub = this.manageService.getCars(false).subscribe(x => {
      this.data = x;
    });
    this.subscriptions.push(sub);
  }

  public onRowSelecting($event: any) {
    let ev = $event as ej.Grid.RowSelectedEventArgs;
    let _car = (this.data as ICar[]).find(x => x.id == ev.selectedData["id"]);
    this.subscriptions.push(this.updateService.openDialog(_car));
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(x => {
        if (x) x.unsubscribe();
      })
    }
  }
}

//
// private openDialog(_car: ICar): void {
//   let dialogRef = this.dialog.open(UpdateDialogComponent, {
//     width: 'auto',
//     data: _car
//   });
//
//   let sub = dialogRef.afterClosed().subscribe(result => {
//     if (result)
//       this.updateCar(result)
//   });
//   this.subscriptions.push(sub)
// }
//
// private updateCar(car: ICar): void {
//   let sub = this.manageService.updateCar(car).subscribe(response => {
//     this.createStatusDialogModel(response);
//   }, (error2 => {
//     console.log(error2);
//     return this.createStatusDialogModel(null);
//   }));
//   this.subscriptions.push(sub);
// }
//
// private createStatusDialogModel(response: Response): void {
//   let model: object = {};
//   if (!response) {
//     model = {
//       title: "Something went wrong!",
//       message: "Request to update car failed. Please see error message below."
//     }
//   } else {
//     model = {
//       title: response.ok
//         ? "Success!"
//         : "Something went wrong!",
//       subModel: response.ok
//         ? response.json() as ICar
//         : response.json(),
//       message: response.ok
//         ? "Car was successfully updated"
//         : "Request to update car failed."
//     }
//   }
//   this.openStatusDialog(model);
// }
//
// private openStatusDialog(data: object): void {
//   this.dialog.open(StatusDialogComponent, {
//     width: 'auto',
//     data: data
//   });
// }
