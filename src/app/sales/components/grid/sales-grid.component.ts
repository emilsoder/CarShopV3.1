import {Component, OnDestroy, OnInit} from '@angular/core';
import {SalesService} from "../../services/sales.service";
import {Subscription} from "rxjs/Subscription";
import {ICar} from "../../../shared/interfaces/ICar";
import {DateFilterViewModel} from "../../models/dateFilterViewModel";
import {GlobalState} from "../../../shared/observers/_global";
import * as moment from "moment";
import {Moment} from "moment";
import "ej-angular2"

@Component({
  selector: 'sales-grid',
  templateUrl: './sales-grid.component.html' })
export class SalesGridComponent implements OnInit, OnDestroy {
  private soldCars: ICar[];
  public dataSource: ICar[];
  private subscriptions: Subscription[] = [];
  public filterType: object;
  public groupedColumns: object;
  public summaryRows: any[];

  constructor(private salesService: SalesService,
              private _state: GlobalState) {
  }

  ngOnInit() {
    this.initializeData();
    this.initializeGrid();
  }

  private initializeData(): void {
    this._state.subscribe("dateFilterChanged", (dateFilter: DateFilterViewModel) => {
      return this.applyFilter(dateFilter);
    });

    let sub = this.salesService.getSoldCars().subscribe(soldCars => {
      this.dataSource = soldCars;
      this._state.notifyDataChanged('soldCarsLoaded', this.getMinMaxDates(soldCars));
      return this.soldCars = soldCars;
    });

    this.subscriptions.push(sub);
  }

  private initializeGrid(): void {
    this.groupedColumns = {groupedColumns: ["soldDate"]};
    this.summaryRows = [{
      title: "Total sales:",
      summaryColumns: [
        {summaryType: ej.Grid.SummaryType.Sum, displayColumn: "soldPrice", dataMember: "soldPrice"}
      ]
    }];

    this.filterType = {filterType: "excel"};
  }

  private getMinMaxDates(cars: ICar[]): DateFilterViewModel {
    let soldDateArray = cars.map(x => moment(new Date(x.soldDate))) as Moment[];
    let vm = new DateFilterViewModel();
    vm.min = moment.min(soldDateArray).toDate()
    vm.max = moment.max(soldDateArray).toDate();

    return vm;
  }

  private applyFilter(dateFilter: DateFilterViewModel) {
    let _soldCars = this.soldCars;
    this.dataSource = _soldCars.filter(x => this.isInRange(x.soldDate, dateFilter))
  }

  private isInRange(_soldDate: string, dateFilter: DateFilterViewModel): boolean {
    let soldDate = moment(new Date(_soldDate));
    return soldDate.diff(moment(new Date(dateFilter.min))) >= 0 && soldDate.diff(moment(new Date(dateFilter.max))) <= 0;
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this._state.unsubscribe("dateFilterChanged")
    }
  }
}
