import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AuctionService, PubSubService} from '../../_services/services';
import {fadeInAnimation} from '../../_animations/index';
import {Car} from "../../models/AuctionList";
import {AuctionFilterPipe} from "../../_pipes/auction-filter.pipe";
import {GlobalState} from "../../_shared/_global";
import {FilterViewModel} from "../../viewmodels/FilterViewModel";
import * as _ from "lodash";
import {Observable} from "rxjs/Observable";
import {FlexLayoutModule} from '@angular/flex-layout';
import {ObservableMedia} from '@angular/flex-layout';
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import {Event, Router} from "@angular/router";
import {ImageService} from "../../_services/image.service";
import {forEach} from "@angular/router/src/utils/collection";
import {async} from "rxjs/scheduler/async";

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

  _filter: FilterViewModel = new FilterViewModel();
  public carsAsync: any = {} || [];
  images: any = {} || [];
  imageSub: Subscription;

  constructor(private auctionService: AuctionService,
              private pubSubService: PubSubService,
              private _state: GlobalState,
              private observableMedia: ObservableMedia,
              private router: Router,
              private imageService: ImageService) {
  }

  ngOnInit() {
    this.subscription = this.pubSubService.on('auctions-updated')
      .subscribe(() => {
        this.refreshCars();
      });
    this.subscribeToEvents();
    this.refreshCars();
    this.getImages();
  }

  getImages(): void {
    this.images = this.imageService.getImages();
  }

  private refreshCars(): void {
    this.carsAsync = this.auctionService.getAuctions();
  }

  private subscribeToEvents() {
    this._state.subscribe('filter', (x: FilterViewModel) => {
      return this._filter = x;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

export class Image {
  id: number;
  url: string;
  carIdentifier: number;
}
