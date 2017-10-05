import {Injectable} from '@angular/core';
import {LocalstorageService} from "./localstorage.service";
import {ILoginResponse} from "../interfaces/ILoginResponse";
import {Router} from "@angular/router";

@Injectable()
export class CurrentUserService {

  constructor(private storageService: LocalstorageService,
              private router: Router) {
  }

  public isLoggedIn(): boolean {
    return this.getCurrentUser() === null ? false : true;
  }

  public getCurrentUser(): ILoginResponse {
    let user = this.storageService.getData("currentUser");
    return user !== null ? user as ILoginResponse : null
  }

  public currentUserIsSeller(): boolean {
    return this.getCurrentUser().roles === "seller";
  }

  public getToken(): string {
    return this.getCurrentUser().access_token;
  }

  public logOut(): void {
    this.storageService.clearData("currentUser");
    this.router.navigate(["/auctions"]);
  }

  public getRoleName(roleId: number) {
    return roleId === 2 ? "seller" : "buyer";
  }
}
