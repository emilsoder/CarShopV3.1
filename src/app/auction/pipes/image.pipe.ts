import {Pipe, PipeTransform} from '@angular/core';
import {Image} from "../components/auction-list/auction-list.component";

@Pipe({
  name: 'findImage'
})
export class FindImagePipe implements PipeTransform {
  transform(items: Image[] = [], carId: number): Image[] {

    let imglist: Image[] = [];
    if (!items || items.length <= 0) {
      imglist.push({id: 0, url: "../assets/media/placeholder.png", carIdentifier: carId});
      return imglist;
    }

    var res = items.filter(x => x.carIdentifier == carId);

    if (!res || res.length <= 0) {
      imglist.push({id: 0, url: "../assets/media/placeholder.png", carIdentifier: carId});
      return imglist;
    }
    else {
      return res  as Image[];
    }
  }
}
