import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {fadeInAnimation} from '../../../layout/_animations/animations';
import {AuctionFilterPipe} from "../../pipes/auction-filter.pipe";
import {GlobalState} from "../../../shared/observers/_global";
import {FilterViewModel} from "../../models/FilterViewModel";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import {ImageService} from "../../services/image.service";
import {AuctionService} from "../../services/services";
import {PubSubService} from "../../../shared/services/pub-sub.service";

@Component({
  moduleId: module.id.toString(),
  selector: "auction-list",
  templateUrl: 'auction-list.component.html',
  styleUrls: ["auction-list.component.css"],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''},
  providers: [AuctionFilterPipe]
})

export class AuctionListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public _filter: FilterViewModel = new FilterViewModel();
  public carsAsync: any = {} || [];
  public images: any = {} || [];

  constructor(private auctionService: AuctionService,
              private pubSubService: PubSubService,
              private _state: GlobalState,
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

  private getImages(): void {
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
