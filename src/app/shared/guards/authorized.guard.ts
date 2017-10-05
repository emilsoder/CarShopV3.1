import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {CurrentUserService} from "../services/currentuser.service";

@Injectable()
export class AuthorizedGuard implements CanActivate {

  constructor(private router: Router,
              private currentUser: CurrentUserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser.getCurrentUser())
      if (this.currentUser.currentUserIsSeller())
        return true;

    this.router.navigate(['/auctions'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
