import {Stop} from "./stop.model";

export class RailLine {
    private _id: string;
    private _stations: Array<Stop>;

    constructor(id: string, stations: Array<Stop>) {
        this._id = id;
        this._stations = stations;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get stations(): Array<Stop> {
        return this._stations;
    }

    set stations(value: Array<Stop>) {
        this._stations = value;
    }
}
