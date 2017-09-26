import {Pipe, PipeTransform} from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(items: any[]): any[] {
    if (!items) {
      return items;
    } else {
      return _.sortBy(items, "id");
    }
  }
}
