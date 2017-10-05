import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {AuthenticationEndPoint} from "../../shared/common/endpoints";
import {LocalstorageService} from "../../shared/services/localstorage.service";
import {ILoginResponse} from "../../shared/interfaces/ILoginResponse";
import {IRegisterUser} from "../../shared/interfaces/IRegisterUser";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  contentHeaders() {
    let contentType = new Headers({"Content-Type": "application/x-www-form-urlencoded"});
    return new RequestOptions({headers: contentType});
  }

  create(user: IRegisterUser): Observable<Response> {
    let headers = this.contentHeaders();
    return this.http.post(AuthenticationEndPoint.register, user);
  }
}

// return this.http.post(AuthenticationEndPoint.register, user, this.jwt());
// return this.http.post(AuthenticationEndPoint.register, user);

// private jwt() {
//   let currentUser = JSON.parse(this.storageService.getData("currentUser")) as ILoginResponse;
//   if (currentUser && currentUser.access_token) {
//     let headers = new Headers({'Authorization': 'Bearer ' + currentUser.access_token});
//     return new RequestOptions({headers: headers});
//   }
