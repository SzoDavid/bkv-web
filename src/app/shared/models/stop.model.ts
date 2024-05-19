import {Station} from "./station.model";

export class Stop {
    private _station?: Station;
    private _durationMinutes?: number;

    constructor(station?: Station, durationMinutes?: number) {
        this._station = station;
        this._durationMinutes = durationMinutes;
    }

    get station(): Station|undefined {
        return this._station;
    }

    set station(value: Station) {
        this._station = value;
    }

    get durationMinutes(): number|undefined {
        return this._durationMinutes;
    }

    set durationMinutes(value: number) {
        this._durationMinutes = value;
    }
}
