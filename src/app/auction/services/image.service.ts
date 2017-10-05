import {Injectable} from '@angular/core';
import {HttpService} from "../../shared/services/http.service";
import {ImageViewModel} from "../models/ImageViewModel";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import {Image} from "../components/auction-list/auction-list.component";
import 'rxjs/Rx';
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/take'
import 'rxjs/observable/throw'
import 'rxjs/Observable';
import {LocalstorageService} from "../../shared/services/localstorage.service";

@Injectable()
export class ImageService {

  constructor(private httpService: HttpService,
              private storageService: LocalstorageService) {
  }

  getImages(): Observable<Image[]> {
    var storedImages = localStorage.getItem("imagelist");
    if (!storedImages) {
      this.httpService.getData("http://localhost:22292/images/list").map(x => {
        localStorage.setItem("imagelist", JSON.stringify(x.json() as Image[]));
        return JSON.parse(localStorage.getItem("imagelist"));
      })
    }
    return JSON.parse(storedImages);
  }

  getImagesById(id: number): Observable<ImageViewModel[]> {
    //////------ Uncomment if Image-API is online ---- ////////
    //  // return this.httpService.getData("http://localhost:22292/images/urls/" + id).map(res => {
    //  //   let result = res.json() as string[];
    //  //   return !result ? this.returnPlaceHolderOnError : this.handleResponseData(result);
    //  // }).do(err => console.log(err))
    //  //   .catch(this.returnPlaceHolderOnError);

    return this.returnPlaceHolderOnError();
  }

  private handleResponseData(result: any): ImageViewModel[] {
    let vm: ImageViewModel[] = [];
    result.forEach(x => vm.push({id: result.indexOf(x), url: x, active: ""}));
    vm[0].active = "active";
    return vm;
  }

  private returnPlaceHolderOnError() {
    return Observable.of([{
      id: 0,
      url: "./assets/media/placeholder.png",
      active: "active"
    },
      {
        id: 1,
        url: "./assets/media/placeholder.png",
        active: ""
      },
      {
        id: 2,
        url: "./assets/media/placeholder.png",
        active: ""
      },
      {
        id: 2,
        url: "./assets/media/placeholder.png",
        active: ""
      }] as ImageViewModel[])
  }
}
