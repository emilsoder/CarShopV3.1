import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpService} from "./http.service";
import {AuctionEndPoint} from "../common/endpoints";
import {Car} from "../models/AuctionList";
import 'rxjs/add/operator/map'
import {Auction} from "../models/Auction";
import {FilterViewModel} from "../viewmodels/FilterViewModel";
import {GlobalState} from "../_shared/_global";
import {MinMaxViewModel} from "../viewmodels/MinMaxViewModel";

@Injectable()
export class AuctionService {

  constructor(private apiService: HttpService, private state: GlobalState) {
    this.apiService = apiService;
  }

  public getAuctionById(id: number): Observable<Auction> {
    return this.apiService.postData(AuctionEndPoint.getById, id)
      .map(res => res.json() as Auction);
  }

  public getAuctions(): Observable<Car[]> {
    return this.apiService.getData(AuctionEndPoint.getall)
      .map(res => {
        this.fireEvents(res.json() as Car[]);
        return res.json();
      });
  }

  private fireEvents(cars: Car[]): boolean {
    this.state.notifyDataChanged('rangeFilterChanged', (new EventFireing()).getFilterViewModel(cars));
    return true;
  }
}

export class EventFireing {
  private getMinMaxRanges(cars: Car[], fieldName: any): MinMaxViewModel {
    let min_max = cars.map(function (elt) {
      return elt[fieldName];
    }).reduce(function (result, elt) {
      if (elt > result.max) result.max = elt;
      if (elt < result.min) result.min = elt;
      return result;
    }, {max: -Infinity, min: +Infinity});
    return new MinMaxViewModel(min_max.min, min_max.max);
  }

  public getFilterViewModel(cars: Car[]): FilterViewModel {
    let p = this.getMinMaxRanges(cars, "price")
    let m = this.getMinMaxRanges(cars, "miles");
    let y = this.getMinMaxRanges(cars, "year");

    let filterViewModel = new FilterViewModel();
    filterViewModel.price = {min: p.min, max: p.max}
    filterViewModel.miles = {min: m.min, max: m.max}
    filterViewModel.year = {min: y.min, max: y.max}
    return filterViewModel;
  }
}

