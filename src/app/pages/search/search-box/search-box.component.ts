import {Component, EventEmitter, Output} from '@angular/core';
import {Station} from "../../../shared/models/station.model";
import {SearchParameters} from "../../../shared/models/searchParameters.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import moment from "moment";
import {StationService} from "../../../shared/services/station.service";
import {DifferentStationsValidator} from "../../../validators/different-stations.validator";

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
    @Output() searchParameters: EventEmitter<SearchParameters> = new EventEmitter();
    stations: Array<Station> = new Array<Station>();
    searchForm: FormGroup;

    constructor(private fb: FormBuilder, private _stationService: StationService) {
        this.loadData();

        this.searchForm = this.fb.group(
            {
                fromStation: [this.stations[0], [Validators.required]],
                toStation: [this.stations[0], [Validators.required]],
                searchDate: [new Date().toISOString().substring(0, 10), [Validators.required, this.validateDate]],
            }, {
                validators: DifferentStationsValidator.differentStations('fromStation', 'toStation')
            });
    }

    validateDate(control: any) {
        const isValid = moment(control.value, 'YYYY-MM-DD').isValid();
        return isValid ? null : {invalidDate: true};
    }

    loadData() {
        this._stationService.getAll().subscribe(stations => {
            if (stations) this.stations = stations;

            this.searchForm.get('fromStation')?.setValue(stations[0].id);
            this.searchForm.get('toStation')?.setValue(stations[0].id);
        })
    }

    getFieldValue(field: string): any {
        return this.searchForm.get(field)?.value;
    }

    onSearch() {
        if (this.searchForm.invalid) return;

        this.searchParameters.emit(
            new SearchParameters(
                this.stations.at(this.stations.findIndex(station => station.id === this.getFieldValue('fromStation'))),
                this.stations.at(this.stations.findIndex(station => station.id === this.getFieldValue('toStation'))),
                new Date(this.getFieldValue('searchDate'))
            )
        );
    }
}
