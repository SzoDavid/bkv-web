import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {SearchComponent} from "./search.component";
import {SearchBoxComponent} from "./search-box/search-box.component";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


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
        ReactiveFormsModule
    ]
})
export class SearchModule {
}
