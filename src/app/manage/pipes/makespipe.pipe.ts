import {Pipe, PipeTransform} from "@angular/core";
import {brands} from "../models/makes";

@Pipe({
  name: 'makesFilterPipe'
})

export class MakesPipe implements PipeTransform {
  transform(items: brands[], inputText: any = ""): any {
    return !items ? [] || items
      : !inputText || inputText.length <= 0
        ? items
        : items.filter(x => {
          return x.n.toLowerCase().indexOf(inputText.toLowerCase()) !== -1;
        });
  }
}
