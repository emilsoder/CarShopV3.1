import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {FormControl} from "@angular/forms";
import {brands} from "../../models/makes";
import {ICar} from "../../../shared/interfaces/ICar";
import {ManageService} from "../../services/manage.service";
import {ExternalSneakyApi} from "../../../shared/common/endpoints";
import {UpdateDialogService} from "../../services/update-dialog.service";

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

  constructor(private manageService: ManageService,
              public dialogRef: MdDialogRef<UpdateDialogComponent>,
              private dialogService: UpdateDialogService,
              @Inject(MD_DIALOG_DATA) public data: any) {
    this.car = data;
    this.colors = this.manageService.getColors();
    this.getBrands();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public makesOnBlur(value) {
    if (!value) return;
    let make = this.brands.find(x => x.n.toLowerCase() === value.toLowerCase());
    if (!make) return;
    this.loadModels(make.i);
  }

  private getBrands(): void {
    $.getJSON(ExternalSneakyApi.getBrands, (data) => {
      return !data || !data.contents ? null : (this.brands = this.dialogService.formatMakes(data.contents));
    });
  }

  private loadModels(carId: number): void {
    $.getJSON(ExternalSneakyApi.getModels(carId), (data) => {
      return !data || !data.contents ? null : (this.models = this.dialogService.formatModels(data.contents));
    });
  }
}
