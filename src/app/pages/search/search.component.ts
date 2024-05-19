import {Component} from '@angular/core';
import {SearchParameters} from "../../shared/models/searchParameters.model";
import {BehaviorSubject} from "rxjs";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchComponent {
    private searchParametersSubject = new BehaviorSubject<SearchParameters>(new SearchParameters());
    searchParameters$ = this.searchParametersSubject.asObservable();

    onSearchParametersChange(params: SearchParameters) {
        this.searchParametersSubject.next(params);
    }
}
