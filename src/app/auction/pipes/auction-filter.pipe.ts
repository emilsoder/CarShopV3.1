import {Pipe, PipeTransform} from '@angular/core';
import {Car} from "../models/AuctionList";
import {FilterViewModel} from "../models/FilterViewModel";
import * as _ from "lodash";

@Pipe({
  name: 'auctionFilter',
  pure: false
})

export class AuctionFilterPipe implements PipeTransform {
  transform(items: Car[], filter: FilterViewModel): Car[] {
    AuctionFilterPipe.filterViewModel = filter;
    if (!items || !AuctionFilterPipe.filterViewModel) return items;
    let _cars = items.filter((item: Car) => this.applyFilter(item, AuctionFilterPipe.filterViewModel));
    return Sort.sort(_cars, filter);
  }

  public static filterViewModel: FilterViewModel = new FilterViewModel();

  applyFilter(car: Car, filter: FilterViewModel) {

    let resultArray = [this.containsSearchText(car.description, filter.searchText),
      this.containsSearchText(car.brand + " " + car.model + " " + car.year, filter.searchText),
       this.checkIfInRange(car.price, filter.price.min, filter.price.max),
      this.checkIfInRange(car.miles, filter.miles.min, filter.miles.max),
      this.checkIfInRange(car.year, filter.year.min, filter.year.max),
      this.checkIfMatchInArray(car.brand, filter.brands),
      this.checkIfMatchInArray(car.model, filter.models),
      this.checkIfMatchInArray(car.color, filter.colors),
      this.hasMatch(car.sellerId, filter.sellerId),
      this.checkIfSold(car.sold, filter.sold)
    ];
    for (let i = 0; i < resultArray.length; i++) {
      if (resultArray[i] === false) {
        return false;
      }
    }
    return true;
  }

  checkIfSold(val: boolean, fromFilter: boolean) {
    if (val === false)
      return fromFilter !== true;
    if (val === true)
      return fromFilter === true;
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
    if (!val) return false;
    for (let i = 0; i < arr.length; i++)
      if (val.toString().toLowerCase() === arr[i].toString().toLowerCase())
        return true;
    return false;
  }

  hasMatch(val: any, input: any) {
    return val <= 0 || input <= 0 ? true
      : val.toString().toLowerCase() === input.toString().toLowerCase();
  }
}

export class Sort {
  public static sort(unsortedCars: Car[], filterViewModel: FilterViewModel): Car[] {
    let sorted = _.sortBy(unsortedCars, filterViewModel.sortOrder.field) as Car[];
    return filterViewModel.sortOrder.descending ? sorted.reverse() : sorted;
  }
}
