import {MinMaxViewModel} from "../models/MinMaxViewModel";
import {FilterViewModel} from "../models/FilterViewModel";
import {ICar} from "../../shared/interfaces/ICar";

export class EventFireing {
  public getFilterViewModel(cars: ICar[]): FilterViewModel {
    let p = this.getMinMaxRanges(cars, "price");
    let m = this.getMinMaxRanges(cars, "miles");
    let y = this.getMinMaxRanges(cars, "year");

    let filterViewModel = new FilterViewModel();
    filterViewModel.price = {min: p.min, max: p.max};
    filterViewModel.miles = {min: m.min, max: m.max};
    filterViewModel.year = {min: y.min, max: y.max};
    return filterViewModel;
  }

  private getMinMaxRanges(cars: ICar[], fieldName: any): MinMaxViewModel {
    let min_max = cars.map(function (elt) {
      return elt[fieldName];
    }).reduce(function (result, elt) {
      if (elt > result.max) result.max = elt;
      if (elt < result.min) result.min = elt;
      return result;
    }, {max: -Infinity, min: +Infinity});
    return new MinMaxViewModel(min_max.min, min_max.max);
  }
}
