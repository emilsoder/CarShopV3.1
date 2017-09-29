import {Car} from "../models/AuctionList";

export class FilterViewModel {
  public id: number;
  public searchText: string = "";
  public brands: any[] = [];
  public price: { min: number, max: number } = {min: -1, max: -1};
  public colors: any[] = [];
  public year: { min: number, max: number } = {min: -1, max: -1};
  public miles: { min: number, max: number } = {min: -1, max: -1};
  public sellerId: number = -1;
  public models: any[] = [];
  public sold: boolean = false;
  public sortOrder: {
    field: string,
    descending: boolean
  } = {
    field: "price",
    descending: false
  };
}

export class CategoryViewModel {
  public id: number;
  public name: string;
  public iconCssClass: string;
}

export class ColorViewModel {
  color: string;
  cssClassName: string;
}

export class BrandViewModel {
  text: string;
  value: string;
}
