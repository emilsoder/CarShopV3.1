import {Pipe, PipeTransform} from "@angular/core";
import {brands} from "../models/makes";

@Pipe({
  name: 'makesFilterPipe'
})
export class MakesPipe implements PipeTransform {

  transform(items: brands[], inputText: any = ""): any {
    if (!items) {
      return [] || items;
    }
    if (!inputText || inputText.length <= 0) {
      return items;
    }

    return items.filter(x => x.n.toLowerCase().indexOf(inputText.toLowerCase()) !== -1)
  }
}
