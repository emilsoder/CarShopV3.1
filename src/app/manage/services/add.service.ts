import {Injectable} from '@angular/core';
import {StatusDialogComponent} from "../../layout/dialog/status-dialog.component";
import {ICar} from "../../shared/interfaces/ICar";
import {model} from "../models/model";
import {brands} from "../models/makes";
import {MatDialog} from "@angular/material";
import {ManageService} from "./manage.service";
import {Response} from "@angular/http";
import {Subscription} from "rxjs/Subscription";
import {IAddCar} from "../models/IAddCar";

@Injectable()
export class AddService {

  constructor(public manageService: ManageService,
              public dialog: MatDialog) {
  }

  public formatModels(responseText): string[] {
    return (JSON.parse(responseText.toString()
      .replace("_loadModels({\"models\":", "")
      .replace("});", "")) as model[])
      .map(x => x.n);
  }

  public formatMakes(responseText): brands[] {
    return JSON.parse(responseText.toString()
      .replace("_loadMakes({\"makes\":", "")
      .replace("});", "")) as brands[];
  }

  public addCarSub(car: IAddCar): Subscription {
    return this.manageService.addCar(car).subscribe(response => {
      this.createDialogModel(response);
    }, (() => {
      return this.createDialogModel(null);
    }));
  }

  public createDialogModel(response: Response) {
    let model: object = {};
    if (!response) {
      model = {
        title: "Oh, fuck. Something went wrong!",
        message: "We're so fucking sorry. Request failed."
      }
    } else {
      model = {
        title: response.ok
          ? "Success!"
          : "Oh, fuck! Something went wrong!",

        subModel: response.ok
          ? response.json() as ICar
          : response.json(),

        message: response.ok
          ? "Car was successfully added to auctions"
          : "We're fucking sorry, dude. The car could not be added. Please see the (probably unreadable) error message below."
      }
    }
    this.openDialog(model);
  }

  public openDialog(data: object): void {
    this.dialog.open(StatusDialogComponent, {
      width: 'auto',
      data: data
    });
  }
}
