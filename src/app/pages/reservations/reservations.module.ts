import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReservationsRoutingModule} from './reservations-routing.module';
import {ReservationsComponent} from "./reservations.component";
import {AllComponent} from './all/all.component';
import {DetailsComponent} from './details/details.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {DateFormatPipe} from "../../shared/pipes/date-format.pipe";
import {TimeFormatPipe} from "../../shared/pipes/time-format.pipe";


@NgModule({
    declarations: [
        ReservationsComponent,
        AllComponent,
        DetailsComponent
    ],
    imports: [
        CommonModule,
        ReservationsRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        DateFormatPipe,
        TimeFormatPipe
    ]
})
export class ReservationsModule {
}
