import {Station} from "./station.model";

export class TimetableElement {
    private _station: Station;
    private _departureTime: Date;

    constructor(station: Station, departureTime: Date) {
        this._station = station;
        this._departureTime = departureTime;
    }

    get station(): Station {
        return this._station;
    }

    set station(value: Station) {
        this._station = value;
    }

    get departureTime(): Date {
        return this._departureTime;
    }

    set departureTime(value: Date) {
        this._departureTime = value;
    }
}
