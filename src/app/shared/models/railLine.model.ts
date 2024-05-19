import {Stop} from "./stop.model";
import {DocumentReference} from "@angular/fire/compat/firestore";

export class RailLine {
    private _reference?: DocumentReference;
    private _id?: string;
    private _stations: Array<Stop>;

    constructor(reference?: DocumentReference, id?: string, stations?: Array<Stop>) {
        this._reference = reference;
        this._id = id;
        this._stations = stations ?? new Array<Stop>();
    }

    get reference(): DocumentReference|undefined {
        return this._reference;
    }

    set reference(value: DocumentReference) {
        this._reference = value;
    }

    get id(): string|undefined {
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
