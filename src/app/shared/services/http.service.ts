import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Headers, RequestOptions} from "@angular/http";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/take'
import 'rxjs/observable/throw'
import 'rxjs/Observable';
import 'rxjs/Rx';
import {CurrentUserService} from "./currentuser.service";

@Injectable()
export class HttpService {
  constructor(private http: Http, private currentUser: CurrentUserService) {
    this.http = http;
  }

  public getData(actionEndpoint: string, headers: RequestOptions = null): Observable<Response> {
    return headers ? this.http.get(actionEndpoint, headers) : this.http.get(actionEndpoint);
  }

  public postData(actionEndpoint: string, model: any, headers: RequestOptions = null): Observable<Response> {
    return headers ? this.http.post(actionEndpoint, model, headers) : this.http.post(actionEndpoint, model);
  }

  public postEncoded(actionEndpoint: string, model: URLSearchParams): Observable<Response> {
    return this.http.post(actionEndpoint, model.toString(), this.authHeaders())
  }

  public putEncoded(actionEndpoint: string, model: URLSearchParams, carId: number): Observable<Response> {
    return this.http.put(actionEndpoint + "/" + carId, model.toString(), this.authHeaders())
  }

  public authHeaders(): RequestOptions {
    console.log(this.currentUser.getToken());
    let _headers = new Headers(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": "Bearer " + this.currentUser.getToken()
      });
    return new RequestOptions({headers: _headers});
  }
}

/*
let body = new URLSearchParams();
body.set('username', username);
body.set('password', _password);
body.set('grant_type', 'password')

//
// headers: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
// options: RequestOptions = new RequestOptions({headers: this.headers});

* */
