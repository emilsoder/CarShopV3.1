import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAddCar} from "../../models/IAddCar";
import {ManageService} from "../../services/manage.service";
import {FormControl} from "@angular/forms";
import {brands} from "../../models/makes";
import {model} from "../../models/model";
import {ICar} from "../../../shared/interfaces/ICar";
import {Subscription} from "rxjs/Subscription";
import {StatusDialogComponent} from "../../../layout/dialog/status-dialog.component";
import {MdDialog} from "@angular/material";
import {DialogViewModel} from "../../../shared/viewmodels/DialogViewModel";
import {Response} from "@angular/http";
import {ExternalSneakyApi} from "../../../shared/common/endpoints";

@Component({
  selector: 'manage-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {

  private responseSub: Subscription;
  public colors: any = [];
  public car: IAddCar = new IAddCar();
  public colorControl = new FormControl();
  public brands: brands[] = [];
  public makesControl = new FormControl();
  public models: string[] = [];
  public modelsControl = new FormControl();

  constructor(private manageService: ManageService,
              public dialog: MdDialog) {
  }

  ngOnInit() {
    this.colors = this.manageService.getColors();
    this.getBrands();
  }

  private getBrands(): void {
    $.getJSON(ExternalSneakyApi.getBrands, (data) => {
      return !data || !data.contents ? null : (this.brands = this.formatMakes(data.contents));
    });
  }

  public makesOnBlur(value): void {
    if (!value) return;
    let make = this.brands.find(x => x.n.toLowerCase() === value.toLowerCase());
    if (!make) return;
    this.loadModels(make.i);
  }

  private loadModels(carId: number): void {
    $.getJSON(ExternalSneakyApi.getModels(carId), (data) => {
      return !data || !data.contents ? null : (this.models = this.formatModels(data.contents));
    });
  }

  private formatModels(responseText): string[] {
    return (JSON.parse(responseText.toString()
      .replace("_loadModels({\"models\":", "")
      .replace("});", "")) as model[])
      .map(x => x.n);
  }

  private formatMakes(responseText): brands[] {
    return JSON.parse(responseText.toString()
      .replace("_loadMakes({\"makes\":", "")
      .replace("});", "")) as brands[];
  }

  public addCar() {
    this.addCarSub();
  }

  private addCarSub(): void {
    this.responseSub = this.manageService.addCar(this.car).subscribe(response => {
      this.createDialogModel(response);
    }, (error2 => {
       return this.createDialogModel(null);
    }));
  }

  private createDialogModel(response: Response) {
    let model: object = {};
    if (!response) {
      model = {
        title: "Something went wrong!",
        message: "Request failed."
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
          ? "Car was successfully added to auctions"
          : "The car could not be added. Please see error message below."
      }
    }
    this.openDialog(model);
  }

  private openDialog(data: object): void {
    this.dialog.open(StatusDialogComponent, {
      width: 'auto',
      data: data
    });
  }

  ngOnDestroy(): void {
    if (this.responseSub) {
      this.responseSub.unsubscribe();
    }
  }
}


// 'http://anyorigin.com/go?url=http%3A//m.mobile.de/svc/r/makes/Car%3F_jsonp%3D_loadMakes%26_lang%3Den&callback=?'
// `http://anyorigin.com/go?url=https%3A//m.mobile.de/svc/r/models/${carId}%3F_jsonp%3D_loadModels%26_lang%3Den&callback=?`
