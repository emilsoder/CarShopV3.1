import {Pipe, PipeTransform} from '@angular/core';
import * as _ from "lodash";
import {LocalstorageService} from "../../shared/services/localstorage.service";
import {Maker} from "../models/Category";
import {GlobalState} from "../../shared/observers/_global";

@Pipe({
  name: 'brandspipe'
})
export class BrandsPipe implements PipeTransform {

  transform(items: any[]): any[] {
    if (!items) {
      return items;
    } else {
      return _.sortBy(items);
    }
  }
}
