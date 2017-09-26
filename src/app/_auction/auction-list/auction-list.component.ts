import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AuctionService, PubSubService} from '../../_services/index';
import {fadeInAnimation} from '../../_animations/index';
import {Car} from "../../models/AuctionList";
import {AuctionFilterPipe} from "../../_pipes/auction-filter.pipe";
import {GlobalState} from "../../_shared/_global";
import {FilterViewModel} from "../../viewmodels/FilterViewModel";
import * as _ from "lodash";
import {Observable} from "rxjs/Observable";

@Component({
  moduleId: module.id.toString(),
  selector: "auction-list",
  templateUrl: 'auction-list.component.html',
  animations: [fadeInAnimation],
  styleUrls: ["auction-list.component.min.css"],
  host: {'[@fadeInAnimation]': ''},
  providers: [AuctionFilterPipe]
})

export class AuctionListComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  cars: Car[] = [];
  _filter: FilterViewModel = new FilterViewModel();
  public carsAsync: any;

  constructor(private auctionService: AuctionService,
              private pubSubService: PubSubService,
              private _state: GlobalState) {
  }

  ngOnInit() {
    this.subscribeToEvents();
    this.refreshCars();
  }

  private refreshCars(): void {
    this.carsAsync = this.auctionService.getAuctions();
  }

  private subscribeToEvents() {
    this.subscription = this.pubSubService.on('auctions-updated')
      .subscribe(() => {
        this.refreshCars();
      });

    this._state.subscribe('filter', (x: FilterViewModel) => {
      return this._filter = x;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
