import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {AppRoutingModule, routedComponents} from './app-routing.module';
import {AuctionService, PubSubService, HttpService, AuctionFilterService} from './_services/services';
import {HttpModule} from "@angular/http";
import {AuctionFilterComponent, AuctionFilterHeaderComponent} from "./_auction/auction";
import {AuctionFilterPipe, OrderByPipe} from "./_pipes/pipes";
import {GlobalState} from "./_shared/_global";
import {MaterialComponentsModule} from "./material-components/material-components.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ImageService} from "./_services/image.service";
import {FindImagePipe} from "./_pipes/image.pipe";
import {DashboardComponent} from './_reporting/dashboard/dashboard.component';
import {TransactionComponent} from './_transactions/transaction/transaction.component';
import {UserComponent} from './user/user.component';
import {UserService} from "./_services/user.service";
import {AuthenticationService} from "./_services/authentication.service";
import {AlertService} from "./_services/alert.service";
import { CompComponent } from './_animations/comp/comp.component';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    AuctionFilterComponent,
    AuctionFilterHeaderComponent,
    AuctionFilterPipe,
    OrderByPipe,
    FindImagePipe,
    DashboardComponent,
    TransactionComponent,
    UserComponent,
    CompComponent
  ],
  imports: [
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
    HttpService,
    ImageService,
    AuctionFilterService,
    AuctionService,
    PubSubService,
    GlobalState,
    UserService,
    AuthenticationService,
    AlertService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
