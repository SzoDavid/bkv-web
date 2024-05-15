import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReservationsRoutingModule} from './reservations-routing.module';
import {ReservationsComponent} from "./reservations.component";
import { AllComponent } from './all/all.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
    declarations: [
        ReservationsComponent,
        AllComponent,
        DetailsComponent
    ],
    imports: [
        CommonModule,
        ReservationsRoutingModule
    ]
})
export class ReservationsModule {
}
