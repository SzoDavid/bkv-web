import { Station } from "./station.model";

export class SearchParameters {
    private _from?: Station;
    private _to?: Station;
    private _date?: Date;

    constructor(from?: Station, to?: Station, date?: Date) {
        this._from = from;
        this._to = to;
        this._date = date;
    }

    get from(): Station|undefined {
        return this._from;
    }

    set from(value: Station) {
        this._from = value;
    }

    get to(): Station|undefined {
        return this._to;
    }

    set to(value: Station) {
        this._to = value;
    }

    get date(): Date|undefined {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }
}
