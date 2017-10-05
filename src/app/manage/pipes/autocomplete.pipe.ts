import {Pipe, PipeTransform} from '@angular/core';
import {brands} from "../models/makes";

@Pipe({
  name: 'autocompleteFilterPipe'
})
export class AutocompletePipe implements PipeTransform {

  transform(items: any[], inputText: any = ""): any {
    return !items ? [] || items
      : !inputText || inputText.length <= 0 ? items
        : items[0] === typeof brands
          ? items.filter(x => {
            return x.n.toLowerCase().indexOf(inputText.toLowerCase()) !== -1;
          }) : items.filter(x => {
            return x.toLowerCase().indexOf(inputText.toLowerCase()) !== -1;
          });
  }
}

