import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuctionMainComponent} from "./auction/components/auction-main/auction-main.component";
import {AuctionDetailsComponent} from "./auction/components/auction-details/auction-details.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {LoginComponent} from "./authentication/components/login/login.component";
import {RegisterComponent} from "./authentication/components/register/register.component";
// import {AuctionListComponent} from "./auction/components/auction-list/auction-list.component";
import {HomeComponent} from "./home/components/home/home.component";
import {DashboardComponent} from "./dashboard/components/dashboard.component";
// import {SalesMainComponent} from "./sales/components/sales-main/sales-main.component";
// import {AddComponent} from "./manage/components/add/add.component";
// import {UpdateComponent} from "./manage/components/update/update.component";
import {AuthorizedGuard} from "./shared/guards/authorized.guard";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: '', component: HomeComponent},
  {
    path: 'auctions', component: AuctionMainComponent,
    children: [
      {
        path: 'details/:id',
        component: AuctionDetailsComponent
      },
    ]
  },
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthorizedGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

export const routedComponents = [];




