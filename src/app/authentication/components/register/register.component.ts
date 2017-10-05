import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {UserService, AlertService} from "../../services/services";
import {IRegisterUser, RegisterUser} from "../../../shared/interfaces/IRegisterUser";

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html'
})

export class RegisterComponent {
  public registerModel: IRegisterUser = new RegisterUser();
  public isError: boolean = false;

  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService) {
  }

  public register() {
    this.userService.create(this.registerModel)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
          this.isError = false;
        },
        error => {
          console.log(error);
          this.isError = true;
        });
  }
}
