import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/index';
import {
  AuctionMainComponent,
  AuctionListComponent,
  AuctionDetailsComponent,
  AuctionFilterHeaderComponent,
  AuctionFilterComponent
} from './_auction/auction';
import {DashboardComponent} from "./_reporting/dashboard/dashboard.component";
import {AuthGuard} from "./_guards/auth.guard";
import {TransactionComponent} from "./_transactions/transaction/transaction.component";
import {UserComponent} from "./user/user.component";
import {RegisterComponent} from "./_authentication/register/register.component";
import {LoginComponent} from "./_authentication/login/login.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: '', component: HomeComponent},
  {
    path: 'auctions', component: AuctionMainComponent,
    children: [
      {
        path: 'details/:id',
        component: AuctionDetailsComponent,
        children: [
          {path: 'placebid', component: TransactionComponent, canActivate: [AuthGuard]}
        ]
      },
    ]
  },
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routedComponents = [HomeComponent, LoginComponent, RegisterComponent, DashboardComponent, UserComponent, AuctionMainComponent, AuctionListComponent, AuctionDetailsComponent];
