import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpService} from "../../shared/services/http.service";
import {AuctionEndPoint} from "../../shared/common/endpoints";
import {Car} from "../models/AuctionList";
import 'rxjs/add/operator/map'
import {Auction} from "../models/Auction";
import {FilterViewModel} from "../models/FilterViewModel";
import {GlobalState} from "../../shared/observers/_global";
import {MinMaxViewModel} from "../models/MinMaxViewModel";
import {forEach} from "@angular/router/src/utils/collection";
import {EventFireing} from "../shared/events";
import {ICar} from "../../shared/interfaces/ICar";


@Injectable()
export class AuctionService {

  constructor(private apiService: HttpService, private state: GlobalState) {
    this.apiService = apiService;
  }

  public getCarById(id: number): Observable<ICar> {
    return this.apiService.getData(AuctionEndPoint.getbyid(id), null)
      .map(res => {
        return res.json() as ICar
      });
  }


  public getAuctions(): Observable<ICar[]> {
    return this.apiService.getData(AuctionEndPoint.getall)
      .map(res => {
        let notSoldCars = (res.json() as ICar[]).filter(x => x.sold !== true)
        this.fireEvents(notSoldCars);
        return res.json() as ICar[];
      });
  }

  private fireEvents(cars: ICar[]): void {
    this.state.notifyDataChanged('rangeFilterChanged', (new EventFireing()).getFilterViewModel(cars));
    this.state.notifyDataChanged("brands", this.getBrands(cars));
    this.state.notifyDataChanged("colors", this.getColors(cars));
    this.mapModels(cars);
  }

  private getColors(cars: ICar[]): string[] {
    let newArr = (Array.from(new Set(cars.map(x => x.color.toLowerCase())))).map(newArr => {
      return newArr.charAt(0).toUpperCase() + newArr.slice(1);
    });
    return newArr;
  }

  private getBrands(cars: ICar[]): string[] {
    let originalArray = cars.map(x => {
      if (x.brand !== null)
        return x.brand.toLowerCase();
    });
    return (Array.from(new Set(originalArray))).map(newArr => {
      if (newArr)
        return newArr.charAt(0).toUpperCase() + newArr.slice(1);
    });

  }

  private mapModels(cars: ICar[]): BrandModel[] {
    let brandModelsArray: BrandModel[] = [];
    let newArr = Array.from(new Set(cars.map(x => {
      if (x.brand !== null)
        return x.brand.toLowerCase();
    })));

    newArr.forEach(brand => {
      if (brand !== null)
        return brandModelsArray.push({brand: brand.toLowerCase(), models: []});
    })

    for (const car of cars) {
      if (car.brand === null || car.model === null) continue;
      let brand_car = car.brand.toLowerCase(), model_car = car.model.toLowerCase();

      let indexOfBrand = brandModelsArray.map(x => x.brand).indexOf(brand_car);
      let currentObjectIArray = brandModelsArray[indexOfBrand];

      if (currentObjectIArray) {
        if (currentObjectIArray.models.indexOf(model_car) === -1) {
          brandModelsArray[indexOfBrand].models.push(model_car);
        }
      }
    }
    return brandModelsArray;
  }
}

export class BrandModel {
  brand: string;
  models: string[] = [];
}
