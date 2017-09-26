import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpService} from "./http.service";
import {FilterEndpoint} from "../common/endpoints";
import {Category, Maker} from "../models/Category";
import {ColorViewModel} from "../viewmodels/FilterViewModel";

@Injectable()
export class AuctionFilterService {
  constructor(private apiService: HttpService) {
    this.apiService = apiService;
  }

  public getCategories(): Observable<Category[]> {
    return this.apiService.getData(FilterEndpoint.getCategories).map(x => x.json());
  }

  public getMakers(): Observable<Maker[]> {
    return this.apiService.getData(FilterEndpoint.getMakers).map(x => x.json());
  }

  public getColors(): Observable<ColorViewModel[]> {
    return this.apiService.getData(FilterEndpoint.getColors).map(x => x.json());
  }
}
