import {Pipe, PipeTransform} from '@angular/core';
import {brands} from "../models/makes";

@Pipe({
  name: 'autocompleteFilterPipe'
})
export class AutocompletePipe implements PipeTransform {

  transform(items: any[], inputText: any = ""): any {
    if (!items) {
      return [] || items;
    }
    if (!inputText || inputText.length <= 0) {
      return items;
    }

    if (items[0] === typeof brands) {
      return items.filter(x => x.n.toLowerCase().indexOf(inputText.toLowerCase()) !== -1)
    }
    else {
      return items.filter(x => x.toLowerCase().indexOf(inputText.toLowerCase()) !== -1)
    }
  }

}

