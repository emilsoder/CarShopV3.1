import {Injectable} from '@angular/core';
import {HttpService} from "../../shared/services/http.service";
import {ICar} from "../../shared/interfaces/ICar";
import {AuctionEndPoint} from "../../shared/common/endpoints";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SalesService {
  constructor(private httpService: HttpService) {
  }

  public getSoldCars(): Observable<ICar[]> {
    return this.httpService.getData(AuctionEndPoint.getall).map(x => {
      return this.applyFilter((x.json() as ICar[]));
    });
  }

  private applyFilter(cars: ICar[]): ICar[] {
    return this.formatUglyDates(cars.filter(x => x.sold === true));
  }

  private formatUglyDates(cars: ICar[]): ICar[] {
    cars.forEach(x => {
      x.soldDate = new Date(Date.parse(x.soldDate)).toLocaleDateString('en-US');
      x.createdDate = new Date(Date.parse(x.createdDate)).toLocaleDateString('en-US')
      x.updatedDate = new Date(Date.parse(x.updatedDate)).toLocaleDateString('en-US')
    });
    return cars;
  }
}
