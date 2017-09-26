import {Pipe, PipeTransform} from '@angular/core';
import {Car} from "../models/AuctionList";
import {FilterViewModel} from "../viewmodels/FilterViewModel";
import {EnumValues} from "enum-values";
import * as _ from "lodash";
import {GlobalState} from "../_shared/_global";

@Pipe({
  name: 'auctionFilter',
  pure: false
})

export class AuctionFilterPipe implements PipeTransform {
  transform(items: Car[], filter: FilterViewModel): Car[] {

    AuctionFilterPipe.filterViewModel = filter;

    if (!items || !AuctionFilterPipe.filterViewModel) {
      return items;
    } else {
      let _cars = items.filter((item: Car) => this.applyFilter(item, AuctionFilterPipe.filterViewModel));
      return Sort.sort(_cars, filter);
    }
  }

  constructor(private _state: GlobalState) {

  }

  public static filterViewModel: FilterViewModel = new FilterViewModel();

  applyFilter(car: Car, filter: FilterViewModel) {

    let resultArray = [this.containsSearchText(car.description, filter.searchText),
      this.checkIfInRange(car.price, filter.price.min, filter.price.max),
      this.checkIfInRange(car.miles, filter.miles.min, filter.miles.max),
      this.checkIfInRange(car.year, filter.year.min, filter.year.max),
      this.checkIfMatchInArray(car.brand, filter.brands),
      this.checkIfMatchInArray(car.model, filter.models),
      this.checkIfMatchInArray(car.color, filter.colors),
      this.hasMatch(car.sellerId, filter.sellerId)
    ];
    for (let i = 0; i < resultArray.length; i++) {
      if (resultArray[i] === false) {
        return false;
      }
    }
    return true;
  }

  containsSearchText(val: string, searchText: string) {
    return searchText === '' || !searchText || searchText === 'undefined'
    || val === '' || !val || val === 'undefined'
      ? true : (val.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }

  checkIfInRange(val: number, min: number, max: number): boolean {
    return min + max <= 0 ? true : val >= min && val <= max;
  }

  checkIfMatchInArray(val: any, arr: any[]): boolean {
    if (!arr || arr.length <= 0)
      return true;

    for (let i = 0; i < arr.length; i++)
      if (val.toString().toLowerCase() === arr[i].toString().toLowerCase() || val.toString().toLowerCase() === "any")
        return true;
    return false;
  }

  hasMatch(val: any, input: any) {
    return val <= 0 || input <= 0 ? true
      : val.toString().toLowerCase() === input.toString().toLowerCase();
  }
}

export class InRangeModel {
  val: number = -1;
  min: number = -1;
  max: number = -1;
}

export class ArrayMatchModel {
  val: any;
  arr: any[] = [];
}

export class Sort {
  public static sort(unsortedCars: Car[], filterViewModel: FilterViewModel): Car[] {
    let sorted = _.sortBy(unsortedCars, filterViewModel.sortOrder.field) as Car[];
    return filterViewModel.sortOrder.descending ? sorted.reverse() : sorted;
  }
}
