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
