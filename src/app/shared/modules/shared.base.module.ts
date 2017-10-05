import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialComponentsModule} from "../../layout/material-components/material-components.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "../../app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";

@NgModule({
  exports: [
    CommonModule,
    HttpModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    FlexLayoutModule
  ],
  declarations: []
})
export class SharedBaseModule {
}
