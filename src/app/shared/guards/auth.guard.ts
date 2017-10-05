import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CurrentUserService} from "../services/currentuser.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private currentUser: CurrentUserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/auctions'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}

