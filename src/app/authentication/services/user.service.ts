import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {AuthenticationEndPoint, UserInfoEndPoint} from "../../shared/common/endpoints";
import {IRegisterUser} from "../../shared/interfaces/IRegisterUser";
import {Observable} from "rxjs/Observable";
import {IRole} from "../models/role";
import {HttpService} from "../../shared/services/http.service";

@Injectable()
export class UserService {

  constructor(private httpService: HttpService) {
  }

  create(user: IRegisterUser): Observable<Response> {
    return this.httpService.postData(AuthenticationEndPoint.register, user);
  }

  getRoles(): Observable<IRole[]> {
    return this.httpService.getData(UserInfoEndPoint.roles).map(roles => {
      return roles.json() as IRole[];
    });
  }
}
