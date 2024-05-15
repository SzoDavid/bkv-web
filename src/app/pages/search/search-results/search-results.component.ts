import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SearchParameters} from "../../../shared/models/searchParameters.model";

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnChanges {
    @Input() searchParameters: SearchParameters|undefined;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['searchParameters']) {
            console.log(changes['searchParameters']);
        }
    }
}
