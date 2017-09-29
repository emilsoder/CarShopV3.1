import {Injectable, OnInit} from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {Subscription} from "rxjs/Subscription";
import {Component} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Car} from "../../models/AuctionList";
import {AuctionService} from "../../_services/auction.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
  ngOnInit(): void {
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      })  }

  public cars: Car[] = [];
  private sub: Subscription;

  @ViewChild('filter') filter: ElementRef;

  constructor(private auctionService: AuctionService) {

  }

  displayedColumns = ['id', 'registrationNumber', 'price', 'sellerId', 'soldPrice', 'soldDate', 'buyerId', 'createdDate'];
  dataSource = new ExampleDataSource(this.auctionService);
}

export class ExampleDataSource extends DataSource<any> {

  public filter: string = "";

  constructor(private _auctionService: AuctionService) {
    super();
  }

  connect(): Observable<Car[]> {
     if (this.filter && this.filter !== "") {
      return this._auctionService.getSoldAuctions(this.filter);
    }
    return this._auctionService.getSoldAuctions();
  }

  disconnect() {
  }
}


// -----------------


