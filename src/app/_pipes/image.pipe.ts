import {Pipe, PipeTransform} from '@angular/core';
import * as _ from "lodash";
import {Image} from "../_auction/auction-list/auction-list.component";

@Pipe({
  name: 'findImage'
})
export class FindImagePipe implements PipeTransform {
  transform(items: Image[] = [], carId: number): Image[] {

    let imglist: Image[] = [];
    if (!items || items.length <= 0) {
      // return [{id: 0, url: "http://via.placeholder.com/800x600", carIdentifier: carId}];
      imglist.push({id: 0, url: "http://buythomas.com/wp-content/themes/thomas-child/assets/images/plchldr255.png", carIdentifier: carId});
      return imglist;
    }

    var res = items.filter(x => x.carIdentifier == carId);

    if (!res || res.length <= 0) {
      imglist.push({id: 0, url: "http://buythomas.com/wp-content/themes/thomas-child/assets/images/plchldr255.png", carIdentifier: carId});
      return imglist;
    }
    else {
      return res  as Image[];
    }
  }
}
