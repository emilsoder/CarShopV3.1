import {Injectable} from '@angular/core';
import {AuctionService} from "./auction.service";
import {Car} from "../models/AuctionList";
import {Subscription} from "rxjs/Subscription";

import {Component} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class SalesService {
//
//   public cars: Car[] = [];
//   private sub: Subscription;
//
//   constructor(private auctionService: AuctionService) {
//   }
//
//   displayedColumns = ['id', 'registrationNumber', 'price', 'sellerId', 'soldPrice', 'soldDate', 'buyerId', 'createdDate'];
//   dataSource = new ExampleDataSource().connect();
// }
//
// export class ExampleDataSource extends DataSource<any> implements GetDataFromService {
//   auctionService: AuctionService;
//
//   connect(): Observable<Car[]> {
//     return this.auctionService.getAuctions();
//   }
//
//   disconnect() {
//   }
// }
//
// export abstract class GetDataFromService {
//   constructor(_auctionService: AuctionService) {
//     this.auctionService = _auctionService;
//   }
//
//   auctionService: AuctionService;
}

