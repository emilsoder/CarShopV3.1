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

const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {
        path: 'auctions',
        component: AuctionMainComponent,
        children: [
            {path: 'add', component: AuctionDetailsComponent},
            {path: 'details/:id', component: AuctionDetailsComponent}
        ]
    },
    {path: '**', redirectTo: ''}
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routedComponents = [HomeComponent, AuctionMainComponent, AuctionListComponent, AuctionDetailsComponent, AuctionFilterHeaderComponent, AuctionFilterComponent];