import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpService} from "../../shared/services/http.service";
import {FilterEndpoint} from "../../shared/common/endpoints";
import {ColorViewModel} from "../models/FilterViewModel";
import {GlobalState} from "../../shared/observers/_global";

@Injectable()
export class AuctionFilterService {
  constructor(private apiService: HttpService, private state: GlobalState) {
    this.apiService = apiService;
  }

  public getColors(): Observable<ColorViewModel[]> {
    return this.apiService.getData(FilterEndpoint.getColors).map(x => {
      return x.json();
    });
  }
}

// public getMakers(): Observable<string[]> {
//   return this.apiService.getData(FilterEndpoint.getMakers).map(x => {
//     return x.json();
//   });
// }
//
// public getCategories(): Observable<Category[]> {
//   return this.apiService.getData(FilterEndpoint.getCategories).map(x => x.json());
// }
