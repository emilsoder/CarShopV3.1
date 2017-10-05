import {Component, OnInit} from '@angular/core';
import {GlobalState} from "../../../shared/observers/_global";
import {DateFilterViewModel} from "../../models/dateFilterViewModel";

@Component({
  selector: 'sales-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  public minDate: Date = (new Date());
  public maxDate: Date = new Date();

  public staticMinDate: Date = new Date();
  public staticMaxDate: Date = new Date();

  constructor(private _state: GlobalState) {
  }

  ngOnInit() {
    this._state.subscribe("soldCarsLoaded", (dates: DateFilterViewModel) => {
      console.log(dates.min);
      this.minDate = dates.min;
      this.maxDate = dates.max;
      this.staticMinDate = dates.min;
      this.staticMaxDate = dates.max;
    })
  }

  public applyFilter() {
    let vm = new DateFilterViewModel();
    vm.min = this.minDate;
    vm.max = this.maxDate;
    this._state.notifyDataChanged("dateFilterChanged", vm);
  }

}
