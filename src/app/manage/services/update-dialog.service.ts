import {Injectable} from '@angular/core';
import {model} from "../models/model";
import {brands} from "../models/makes";

@Injectable()
export class UpdateDialogService {

  public formatModels(responseText): string[] {
    if (!responseText) return null;
    return (JSON.parse(responseText.toString()
      .replace("_loadModels({\"models\":", "")
      .replace("});", "")) as model[])
      .map(x => x.n);
  }

  public formatMakes(responseText): brands[] {
    if (!responseText) return null;
    return JSON.parse(responseText.toString()
      .replace("_loadMakes({\"makes\":", "")
      .replace("});", "")) as brands[];
  }
}
