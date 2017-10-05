import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {FormControl} from "@angular/forms";
import {brands} from "../../models/makes";
import {ICar} from "../../../shared/interfaces/ICar";
import {ManageService} from "../../services/manage.service";
import {model} from "../../models/model";
import {ExternalSneakyApi} from "../../../shared/common/endpoints";

@Component({
  selector: 'update-dialog',
  templateUrl: './update-dialog.component.html'
})
export class UpdateDialogComponent {
  public car: ICar = new ICar();
  public colors: any;
  public colorControl = new FormControl();
  public brands: brands[] = [];
  public makesControl = new FormControl();
  public models: string[] = [];
  public modelsControl = new FormControl();
  public soldFieldsRequired: boolean = false;

  constructor(private manageService: ManageService, public dialogRef: MdDialogRef<UpdateDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {
    this.car = data;
    this.colors = this.manageService.getColors();
    this.getBrands();
  }

  public   onNoClick(): void {
    this.dialogRef.close();
  }


  private getBrands(): void {
    $.getJSON(ExternalSneakyApi.getBrands, (data) => {
      return !data || !data.contents ? null : (this.brands = this.formatMakes(data.contents));
    });
  }

  public makesOnBlur(value) {
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
    if (!responseText) return null;
    return (JSON.parse(responseText.toString()
      .replace("_loadModels({\"models\":", "")
      .replace("});", "")) as model[])
      .map(x => x.n);
  }

  private formatMakes(responseText): brands[] {
    if (!responseText) return null;
    return JSON.parse(responseText.toString()
      .replace("_loadMakes({\"makes\":", "")
      .replace("});", "")) as brands[];
  }
}


//    $.getJSON(`http://anyorigin.com/go?url=https%3A//m.mobile.de/svc/r/models/${carId}%3F_jsonp%3D_loadModels%26_lang%3Den&callback=?`, (data) => {
//     $.getJSON('http://anyorigin.com/go?url=http%3A//m.mobile.de/svc/r/makes/Car%3F_jsonp%3D_loadMakes%26_lang%3Den&callback=?', (data) => {
