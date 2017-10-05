import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAddCar} from "../../models/IAddCar";
import {ManageService} from "../../services/manage.service";
import {FormControl, NgForm} from "@angular/forms";
import {brands} from "../../models/makes";
import {Subscription} from "rxjs/Subscription";
import {ExternalSneakyApi} from "../../../shared/common/endpoints";
import {AddService} from "../../services/add.service";

@Component({
  selector: 'manage-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit, OnDestroy {

  public colors: any = [];
  public car: IAddCar = new IAddCar();
  public colorControl = new FormControl();
  public brands: brands[] = [];
  public makesControl = new FormControl();
  public models: string[] = [];
  public modelsControl = new FormControl();
  private responseSub: Subscription;

  constructor(private manageService: ManageService,
              private addService: AddService) {
  }

  tryAddCarOnSubmit(addCarForm: NgForm) {
    if (addCarForm.valid) this.addCar();
  }

  ngOnInit() {
    this.getColors();
    this.getBrands();
  }

  public makesOnBlur(value): void {
    if (!value) return;
    let make = this.brands.find(x => x.n.toLowerCase() === value.toLowerCase());
    if (!make) return;
    this.loadModels(make.i);
  }

  private getColors(): void {
    this.colors = this.manageService.getColors();
  }

  private addCar() {
    this.responseSub = this.addService.addCarSub(this.car);
  }

  private getBrands(): void {
    $.getJSON(ExternalSneakyApi.getBrands, (data) => {
      return !data || !data.contents ? null : (this.brands = this.addService.formatMakes(data.contents));
    });
  }

  private loadModels(carId: number): void {
    $.getJSON(ExternalSneakyApi.getModels(carId), (data) => {
      return !data || !data.contents ? null : (this.models = this.addService.formatModels(data.contents));
    });
  }

  ngOnDestroy(): void {
    if (this.responseSub) {
      this.responseSub.unsubscribe();
    }
  }
}
