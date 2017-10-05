import {Injectable} from '@angular/core';
import {HttpService} from "../../shared/services/http.service";
import {BidEndpoint} from "../../shared/common/endpoints";
import {IBid} from "../../shared/interfaces/IBid";
import {Observable} from "rxjs/Observable";
import {ICreateBid} from "../../shared/interfaces/ICreateBid";
import {CurrentUserService} from "../../shared/services/currentuser.service";
import {Response} from "@angular/http";

@Injectable()
export class BidService {
  constructor(private httpService: HttpService,
              private currentUser: CurrentUserService) {
  }

  public getBidsByCarId(carId: number): Observable<IBid[]> {
    return this.httpService.getData(BidEndpoint.getbyid(carId)).map(x => {
      return x.json() as IBid[];
    })
  }

  public getAllBids(): Observable<IBid[]> {
    return this.httpService.getData(BidEndpoint.get).map(x => {
      return x.json() as IBid[];
    });
  }

  public createBid(bid: ICreateBid): Observable<Response> {
    return this.httpService.postEncoded(BidEndpoint.create, this.createBidFormEncodedBuilder(bid));
  }

  private createBidFormEncodedBuilder(bid: ICreateBid): URLSearchParams {
    let body = new URLSearchParams();
    body.set('bidPrice', bid.bidPrice.toString());
    body.set('bidderId', this.currentUser.getCurrentUser().userId);
    body.set('carId', bid.carId.toString());
    return body;
  }
}
