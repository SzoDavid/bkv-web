import {Component, EventEmitter, Output} from '@angular/core';
import {Station} from "../../../shared/models/station.model";
import {SearchParameters} from "../../../shared/models/searchParameters.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import moment from "moment";

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
    @Output() searchParameters: EventEmitter<SearchParameters> = new EventEmitter();
    stations: Array<Station> = new Array<Station>();
    searchForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.loadData();

        this.searchForm = this.fb.group(
            {
                fromStation: [this.stations[0], [Validators.required]],
                toStation: [this.stations[0], [Validators.required]],
                searchDate: [new Date().toISOString().substring(0, 10), [Validators.required, this.validateDate]],
            });
    }

    validateDate(control: any) {
        const isValid = moment(control.value, 'YYYY-MM-DD').isValid();
        return isValid ? null : {invalidDate: true};
    }

    loadData() {
        for (let i = 0; i < 10; i++) {
            this.stations.push(new Station('id' + i, 'station' + i));
        }
    }

    getFieldValue(field: string): any {
        return this.searchForm.get(field)?.value;
    }

    onSearch() {
        if (this.searchForm.invalid) return;

        this.searchParameters.emit(
            new SearchParameters(
                this.getFieldValue('fromStation'),
                this.getFieldValue('toStation'),
                new Date(this.getFieldValue('searchDate'))
            )
        );
    }
}
