import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from "../../services/services";
import {IRegisterUser, RegisterUser} from "../../../shared/interfaces/IRegisterUser";

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html'
})

export class RegisterComponent {
  public registerModel: IRegisterUser = new RegisterUser();
  public isError: boolean = false;
  // public readonly rolesViewModel = [{roleId: 2, roleName: "Seller"}, {roleId: 3, roleName: "Buyer"}]
  public roles: any;

  constructor(private router: Router,
              private userService: UserService) {
    this.roles = this.userService.getRoles();
  }

  public register() {
    this.userService.create(this.registerModel)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
          this.isError = false;
        },
        error => {
          console.log(error);
          this.isError = true;
        });
  }


}
