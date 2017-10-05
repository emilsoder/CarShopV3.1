import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';
import {AuthenticationEndPoint} from '../../shared/common/endpoints';
import {ILoginResponse} from "../../shared/interfaces/ILoginResponse";
import {LocalstorageService} from "../../shared/services/localstorage.service";

@Injectable()
export class AuthenticationService {
  constructor(private http: Http,
              private storageService: LocalstorageService) {
  }

  headers: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  options: RequestOptions = new RequestOptions({headers: this.headers});

  login(username: string, _password: string): Observable<Response> {

    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', _password);
    body.set('grant_type', 'password')

    return this.http
      .post(AuthenticationEndPoint.login, body.toString(), this.options)
      .map((response: Response) => {
        console.log(response)
        let user = response.json() as ILoginResponse;
        this.storageService.setData('currentUser', user);
        return response;
      });
  }

  logout() {
    this.storageService.clearData("currentUser")
  }
}
