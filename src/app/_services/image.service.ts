import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {ImageViewModel} from "../viewmodels/auction-details.viewmodel";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import {Image} from "../_auction/auction-list/auction-list.component";

@Injectable()
export class ImageService {

  constructor(private httpService: HttpService) {
  }

  getImages(): Observable<Image[]> {
    var storedImages = localStorage.getItem("imagelist")
    if (!storedImages) {
      this.httpService.getData("http://localhost:22292/images/list").map(x => {
        localStorage.setItem("imagelist", JSON.stringify(x.json() as Image[]));
        return JSON.parse(localStorage.getItem("imagelist"));
      })
    }
    return JSON.parse(storedImages);
  }

  getImagesById(id: number): Observable<ImageViewModel[]> {
    return this.httpService.getData("http://localhost:22292/images/urls/" + id)
      .map(res => {
        let result = res.json() as string[];
        let vm: ImageViewModel[] = [];

        if (!result) {
          return [{
            id: 0,
            url: "./app/src/assets/media/placeholder.png",
            active: "active"
          }] as ImageViewModel[]
        }

        result.forEach(x => vm.push({id: result.indexOf(x), url: x, active: ""}))
        vm[0].active = "active";

        return vm as ImageViewModel[];
      });
  }

  private catchError(error: any): Observable<any[]> {
    console.log(error);
    return Observable.of([{
      id: 0,
      url: "./app/src/assets/media/placeholder.png",
      active: "active"
    }] as ImageViewModel[])
  }
}

