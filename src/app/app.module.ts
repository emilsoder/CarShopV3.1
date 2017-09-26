import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppRoutingModule, routedComponents} from './app-routing.module';
import {AuctionService, PubSubService, HttpService, AuctionFilterService} from './_services/index';
import {HttpModule} from "@angular/http";
import {AuctionFilterComponent, AuctionFilterHeaderComponent} from "./_auction/auction";
import {AuctionFilterPipe} from "./_pipes/auction-filter.pipe";
import {GlobalState} from "./_shared/_global";
import {OrderByPipe} from "./_pipes/orderby.pipe";
// import {EJAngular2Module} from 'ej-angular2';
// import * as $ from 'jquery';
// import "bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    AuctionFilterComponent,
    AuctionFilterHeaderComponent,
    AuctionFilterPipe,
    OrderByPipe],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [HttpService,
    AuctionFilterService,
    AuctionService,
    PubSubService,
    GlobalState],
  bootstrap: [AppComponent]
})

export class AppModule {
}
