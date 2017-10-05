import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent, RegisterComponent} from "./components/components";
import {AuthenticationService, UserService} from "./services/services";

import {MaterialComponentsModule} from "../layout/material-components/material-components.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "../app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {LocalstorageService} from "../shared/services/localstorage.service";
import {LoginDialogComponent} from './components/login-dialog/login-dialog.component';

@NgModule({
  declarations: [

    LoginComponent,
    RegisterComponent,
    LoginDialogComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    FlexLayoutModule,
  ],
  providers: [
    AuthenticationService,
    UserService,
    LocalstorageService
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    LoginDialogComponent
  ]
})
export class AuthenticationModule {
}
