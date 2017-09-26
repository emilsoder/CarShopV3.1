import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuctionService, PubSubService} from '../../_services/index';
import {Auction} from "../../models/Auction";
import {ImageViewModel} from "../../viewmodels/auction-details.viewmodel";

@Component({
  moduleId: module.id.toString(),
  selector: "auction-details",
  templateUrl: 'auction-details.component.html',
  styleUrls: ["auction-details.component.css"]
})

export class AuctionDetailsComponent implements OnInit {
  title = 'Details';
  auction: Auction = new Auction;
  counter: number = 0;
  _images: ImageViewModel[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auctionService: AuctionService,
              private pubSubService: PubSubService) {
    this.counter = 0;
  }

  ngOnInit() {
    this.auctionService.getAuctionById(Number(this.route.snapshot.params['id']))
      .subscribe(x => {
        this.auction = x;

        this.auction.images.push("https://i.ebayimg.com/00/s/MTE3NFgxNjAw/z/pokAAOSwg6pZa~k8/$_20.jpg");
        this.auction.images.push("https://i.ebayimg.com/00/s/NjAwWDgwMA==/z/JdsAAOSwbm9ZqIGt/$_20.jpg");
        this.auction.images.push("https://i.ebayimg.com/00/s/NDgwWDY0MA==/z/lFQAAOSwd~RZRMoM/$_20.jpg");

        for (let i = 0; i < this.auction.images.length; i++) {
          let isActive = "";
          if (i === 0) {
            isActive = "active"
          } else {
            isActive = "";
          }
          this._images.push({id: i, url: this.auction.images[i], _active: isActive});
        }
      });

    $("#auction-main-row").fadeOut("fast", function () {
      $("#detailsContainer").fadeIn("fast");
    });

    $(".left").click(function () {
      $("#myCarousel").carousel("prev");
    });

    $(".right").click(function () {
      $("#myCarousel").carousel("next");
    });
  }

  public renderOnLoad(): void {
    let c1 = $("#myCarousel > .carousel-inner > .item").first();
    console.log($(c1));
    $(c1).addClass("active");
  }

  closeThis() {
    let elemId = `auction_${this.auction.id}`;
    $("#detailsContainer").hide("fast");
    $("#auction-main-row").fadeIn("fast", function () {
      _scrollIntoView(elemId);
    });

    this.router.navigate(['auctions']);
  }

  saveProduct() {
    this.router.navigate(['auctions']);
    this.pubSubService.publish('auctions-updated');
  }

  public changeImage(_id: any, _url: any,) {
    let elem = document.getElementById("main-img")
      .setAttribute("stc", _url);
  }
}

function _scrollIntoView(elementId: any): void {
  var e = document.getElementById(elementId);
  // e.scrollIntoView();
  if (!!e && e.scrollIntoView) {
    e.scrollIntoView({behavior: 'smooth'});
  }
}

