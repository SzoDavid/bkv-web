import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllComponent} from "./all/all.component";
import {DetailsComponent} from "./details/details.component";

const routes: Routes = [
    {path: 'all', component: AllComponent},
    {path: ':reservationId', component: DetailsComponent},
    {path: '', redirectTo: 'all', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReservationsRoutingModule {
}
