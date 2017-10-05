import {Component, Inject} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {UserService} from "../../services/user.service";
import {IRegisterUser, RegisterUser} from "../../../shared/interfaces/IRegisterUser";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  public loginModel: any = {};
  public registerModel: IRegisterUser = new RegisterUser();

  public isError: boolean = false;
  public isLoginView: boolean = true;
  public title: string = this.isLoginView ? "Login" : "Register";

  constructor(private authenticationService: AuthenticationService,
              public dialogRef: MdDialogRef<LoginDialogComponent>,
              private userService: UserService,
              @Inject(MD_DIALOG_DATA) public data: any) {
  }

  public onNoClick(): void {
    this.dialogRef.close(null);
  }

  public login() {
    this.authenticationService.login(this.loginModel.username, this.loginModel.password)
      .subscribe(response => {
        if (response.ok)
          this.dialogRef.close(true);
        else
          this.isError = response.ok ? false : true;
      }, error2 => this.isError = true);
  }


  public register() {
    this.userService.create(this.registerModel)
      .subscribe(response => {
          if (response.ok) {
            this.loginModel.username = this.registerModel.userName;
            this.loginModel.password = this.registerModel.password;
            this.login()
          }
          this.isError = response.ok ? false : true;
        },
        error => {
          console.log(error);
          this.isError = true;
        });
  }
}
