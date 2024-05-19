import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {SearchComponent} from "./search.component";
import {SearchBoxComponent} from "./search-box/search-box.component";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {DateFormatPipe} from "../../shared/pipes/date-format.pipe";
import {TimeFormatPipe} from "../../shared/pipes/time-format.pipe";


@NgModule({
    declarations: [
        SearchComponent,
        SearchBoxComponent,
        SearchResultsComponent
    ],
    imports: [
        CommonModule,
        SearchRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        DateFormatPipe,
        TimeFormatPipe
    ]
})
export class SearchModule {
}
