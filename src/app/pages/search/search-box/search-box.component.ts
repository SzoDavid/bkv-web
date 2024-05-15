import {Component} from '@angular/core';
import {Station} from "../../../shared/models/station.model";

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
    stations: Array<Station>;
    fromStation: Station
    toStation: Station;

    constructor() {
        this.stations = new Array<Station>();

        this.loadData();

        this.fromStation = this.stations[0];
        this.toStation = this.stations[0];
    }

    loadData() {
        for (let i = 0; i < 10; i++) {
            this.stations.push(new Station('id' + i, 'station' + i));
        }
    }

    onSearch() {
        console.log({from: this.fromStation, to: this.toStation});
    }
}
