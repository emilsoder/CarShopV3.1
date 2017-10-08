import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {ImageService} from "../../services/image.service";
import "rxjs/add/operator/takeWhile";
import {AuctionService} from "../../services/services";
import {ICar} from "../../../shared/interfaces/ICar";
import {BidService} from "../../services/bid.service";
import {CreateBid} from "../../../shared/interfaces/ICreateBid";
import {CurrentUserService} from "../../../shared/services/currentuser.service";
import {IBid} from "../../../shared/interfaces/IBid";
import * as _ from "lodash";
import {StatusDialogComponent} from "../../../layout/dialog/status-dialog.component";
import {MatDialog} from "@angular/material";
import {Response} from "@angular/http";
import {LoginDialogComponent} from "../../../authentication/components/login-dialog/login-dialog.component";

@Component({
  moduleId: module.id.toString(),
  selector: "auction-details",
  templateUrl: 'auction-details.component.html',
  styleUrls: ["auction-details.component.css"]
})

export class AuctionDetailsComponent implements OnInit, OnDestroy {
  public isUserLoggedIn: boolean = false;
  public bidHistory: any;
  public car: ICar = new ICar();
  public _images: any = {} || [];
  public bidPrice: number;
  public minimumBidPrice: number = 0;
  private subscriptions: Subscription[] = [];
  private alive: boolean = true;
  private clicked: boolean = false;

  constructor(private auctionService: AuctionService,
              private route: ActivatedRoute,
              private router: Router,
              private imageService: ImageService,
              private bidService: BidService,
              private currentUser: CurrentUserService,
              public dialog: MatDialog) {
    this.isUserLoggedIn = this.currentUser.isLoggedIn();
  }

  ngOnInit() {
    this.loadData();
    this.setScripts();
  }

  public openLoginDialog(): void {
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      width: 'auto',
      data: null
    });

    let sub = dialogRef.afterClosed().subscribe(() => {
      this.isUserLoggedIn = this.currentUser.isLoggedIn();
    });
    this.subscriptions.push(sub)
  }

  public setGridScroll() {
    if (!this.clicked)
      $('.e-gridcontent').css("overflow-x", "scroll");
    this.clicked = true;
  }

  public formatDate(date: string): string {
    return new Date(date).toLocaleDateString("en-US");
  }

  public createBid(): void {
    if (this.bidPrice <= this.minimumBidPrice || !this.bidPrice)
      return;

    let bid: CreateBid = {
      bidPrice: this.bidPrice,
      carId: this.car.id,
      bidderId: 0
    };

    this.bidService.createBid(bid).subscribe(response => {
      this.createDialogModel(response);
    }, (error2 => this.createDialogModel(error2)));
  }

  public changeImage(direction: string) {
    $("#myCarousel").carousel(direction);
  }

  public closeThis() {
    this.resetView();
    this.router.navigate(['auctions']);
  }

  ngOnDestroy(): void {
    this.resetView();
    if (this.subscriptions) {
      this.subscriptions.forEach(x => {
        if (x) x.unsubscribe();
      })
    }
  }

  private loadData(): void {
    this.loadImages();
    this.loadCar();
  }

  private loadImages() {
    this._images = this.imageService.getImagesById(this.route.snapshot.params['id']);
  }

  private loadCar() {
    let sub = this.auctionService.getCarById(Number(this.route.snapshot.params['id']))
      .takeWhile(() => this.alive).subscribe(x => {
        this.car = x;
        this.loadBidHistory();
        this.alive = false;
      });
    this.subscriptions.push(sub);
  }

  private loadBidHistory() {
    let sub = this.bidService.getBidsByCarId(this.car.id).subscribe(x => {
      if (x as IBid[]) {
        let bidPriceArray = ( x as IBid[]).map(x => x.bidPrice);
        if (bidPriceArray) {
          let minBidPrice = _.max(bidPriceArray);
          this.minimumBidPrice = (!minBidPrice) ? 0 : minBidPrice;
        }
      }
      return this.bidHistory = x as IBid[];
    });
    this.subscriptions.push(sub);
  }

  private createDialogModel(response: Response) {
    let model = {
      title: response.ok
        ? "Success!"
        : "Something went wrong!",
      subModel: response.ok
        ? response.json() as IBid
        : response.json(),
      message: response.ok
        ? "Bid was successfully placed"
        : "Bid could not be processed. Please see error message below."
    };
    this.openDialog(model);
  }

  private openDialog(data: object): void {
    let dialogRef = this.dialog.open(StatusDialogComponent, {
      width: 'auto',
      data: data
    });

    let sub = dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(["/auctions"]);
    });
    this.subscriptions.push(sub)
  }

  private resetView() {
    let elemId = `auction_${Number(this.route.snapshot.params['id'])}`;
    $("#detailsContainer").hide("fast");
    $("#auction-main-row").fadeIn("fast", function () {
      let elem = document.getElementById(elemId);
      if (elem) elem.scrollIntoView({behavior: 'smooth'});
    });
  }

  private setScripts(): void {
    $(function () {
      $("#auction-main-row").fadeOut("fast", function () {
        $("#detailsContainer").fadeIn("fast");
      });
      return false;
    });
  }
}
