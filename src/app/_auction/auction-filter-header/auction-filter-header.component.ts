import {Component, OnInit} from "@angular/core";
import {AuctionFilterPipe} from "../../_pipes/auction-filter.pipe";
import {GlobalState} from "../../_shared/_global";

@Component({
  moduleId: module.id.toString(),
  selector: "auction-filter-header",
  templateUrl: "auction-filter-header.component.html",
  styleUrls: ["auction-filter-header.component.css"],
  providers: [AuctionFilterPipe]
})

export class AuctionFilterHeaderComponent implements OnInit {

  constructor(private _state: GlobalState) {
    this._state.notifyDataChanged('filter', this.searchArg);
  }

  sortOptions = [
    {value: "price_asc", field: 'price', descending: false, viewValue: 'Price ascending'},
    {value: "price_desc",field: 'price',  descending: true,  viewValue: 'Price descending'},
    {value: "date_asc",field: 'date', descending: false,  viewValue: 'Newest first'},
    {value: "date_desc",field: 'date', descending: true,  viewValue: 'Oldest first'}
  ];

  searchArg: any = "";

  ngOnInit() {
    this._state.notifyDataChanged('filter', this.searchArg);
  }

  setSorting(val: string, isDesc: boolean) {
    let currentFilter = AuctionFilterPipe.filterViewModel;
    currentFilter.sortOrder.field = val;
    currentFilter.sortOrder.descending = isDesc;
  }

  changestate() {
    let currentFilter = AuctionFilterPipe.filterViewModel;
    currentFilter.searchText = this.searchArg;
    this._state.notifyDataChanged('filter', currentFilter);
  }
}
