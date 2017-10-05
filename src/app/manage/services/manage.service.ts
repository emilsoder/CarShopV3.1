import {Injectable} from '@angular/core';
import {HttpService} from "../../shared/services/http.service";
import {IAddCar} from "../models/IAddCar";
import {AuctionEndPoint, FilterEndpoint} from "../../shared/common/endpoints";
import {Observable} from "rxjs/Observable";
import {Response} from "@angular/http";
import {ColorViewModel} from "../../auction/models/FilterViewModel";
import {CurrentUserService} from "../../shared/services/currentuser.service";
import {ICar} from "../../shared/interfaces/ICar";

@Injectable()
export class ManageService {

  constructor(private httpService: HttpService,
              private currentUser: CurrentUserService) {
  }

  public getCars(sold: boolean = true): Observable<ICar[]> {
    return this.httpService.getData(AuctionEndPoint.getall).map(x => {
      return (x.json() as ICar[]).filter(x => x.sold == sold);
    });
  }

  public addCar(car: IAddCar): Observable<Response> {
    return this.httpService.postEncoded(AuctionEndPoint.add, this.addCarFormEncodedBuilder(car));
  }

  public updateCar(car: ICar): Observable<Response> {
    return this.httpService.putEncoded(AuctionEndPoint.update, this.updateCarFormEncodedBuilder(car), car.id);
  }

  public getColors(): Observable<string[]> {
    return this.httpService.getData(FilterEndpoint.getColors).map(x => {
      return (x.json() as ColorViewModel[]).map(x => x.color);
    });
  }

  private addCarFormEncodedBuilder(car: IAddCar): URLSearchParams {
    let body = new URLSearchParams();
    body.set('registrationNumber', car.registrationNumber);
    body.set('brand', car.brand);
    body.set('model', car.model);
    body.set('year', car.year.toString());
    body.set('miles', car.miles.toString());
    body.set('price', car.price.toString());
    body.set('color', car.color);
    body.set('description', car.description);
    body.set('sellerId', this.currentUser.getCurrentUser().userId);
    return body;
  }

  private updateCarFormEncodedBuilder(car: ICar): URLSearchParams {
    let body = new URLSearchParams();
    body.set('id', !car.id ? null : car.id.toString());
    body.set('registrationNumber', car.registrationNumber);
    body.set('brand', car.brand);
    body.set('model', car.model);
    body.set('year', !car.year ? "null" : car.year.toString());
    body.set('miles', !car.miles ? "null" : car.miles.toString());
    body.set('price', !car.price ? "null" : car.price.toString());
    body.set('color', car.color);
    body.set('description', car.description);

    body.set('sold', car.sold.toString());
    body.set('sellerId', !car.sellerId ? "null" : car.sellerId.toString());
    body.set('soldDate', car.soldDate);
    body.set('soldPrice', !car.soldPrice ? "null" : car.soldPrice.toString());
    body.set('buyerId', !car.buyerId ? "null" : car.buyerId.toString());

    body.set('createdDate', car.createdDate);
    body.set('updatedDate', new Date(car.updatedDate).toISOString());
    return body;
  }
}


