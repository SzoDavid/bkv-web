import {Component} from '@angular/core';
import {SearchParameters} from "../../shared/models/searchParameters.model";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchComponent {
    searchParameters: SearchParameters|undefined;

    searchTrains(params: SearchParameters) {
        this.searchParameters = params;
    }
}
