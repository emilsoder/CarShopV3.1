import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuctionService, PubSubService} from '../../_services/services';
import {Auction} from "../../models/Auction";
import {ImageViewModel} from "../../viewmodels/auction-details.viewmodel";
import {Subscription} from "rxjs/Subscription";
import {Car} from "../../models/AuctionList";
import {ImageService} from "../../_services/image.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/takeWhile";

@Component({
  moduleId: module.id.toString(),
  selector: "auction-details",
  templateUrl: 'auction-details.component.html',
  styleUrls: ["auction-details.component.css"]
})

export class AuctionDetailsComponent implements OnInit, OnDestroy {
  goingBack: Subscription;


  title = 'Details';
  car: any = new Car();
  auction: any = new Auction();
  auctionSub: Subscription;
  _images: any = {} || [];
  shouldLoadImageCollection: boolean = false;


  private alive: boolean = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auctionService: AuctionService,
              private imageService: ImageService,
              private pubSubService: PubSubService) {
  }

  ngOnInit() {
    this.goingBack = this.router.events.subscribe();
    this._images = this.imageService.getImagesById(this.route.snapshot.params['id']);
    this.auctionService.getAuctionById(Number(this.route.snapshot.params['id']))
      .takeWhile(() => this.alive).subscribe(x => {
      this.auction = x;
      this.alive = false;
    });

    $("#auction-main-row").fadeOut("fast", function () {
      $("#detailsContainer").fadeIn("fast");
    });
  }

  loadImageCollection(): void {
    this.shouldLoadImageCollection = true;
  }

  changeImage(direction: string) {
    $("#myCarousel").carousel(direction);
  }

  closeThis() {
    this.resetView();
    this.router.navigate(['auctions']);
  }

  loaded() {
    $(".carousel-inner.item").first().addClass("active");
  }

  resetView() {
    let elemId = `auction_${Number(this.route.snapshot.params['id'])}`;
    $("#detailsContainer").hide("fast");
    $("#auction-main-row").fadeIn("fast", function () {
      document.getElementById(elemId).scrollIntoView({behavior: 'smooth'});
    });
  }

  ngOnDestroy(): void {
    this.resetView();
    this.goingBack.unsubscribe();
    this.shouldLoadImageCollection = false;
  }
}
