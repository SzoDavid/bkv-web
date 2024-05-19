import {RailLine} from "./railLine.model";
import {DocumentReference} from "@angular/fire/compat/firestore";

export class Train {
    private _reference?: DocumentReference;
    private _id?: string;
    private _name?: string;
    private _line?: RailLine;
    private _ascendingOrder?: boolean;
    private _departure?: Date;

    constructor(reference?: DocumentReference, id?: string, name?: string, line?: RailLine, ascendingOrder?: boolean, departure?: Date) {
        this._reference = reference;
        this._id = id;
        this._name = name;
        this._line = line;
        this._ascendingOrder = ascendingOrder;
        this._departure = departure;
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

    get name(): string|undefined {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get line(): RailLine|undefined {
        return this._line;
    }

    set line(value: RailLine) {
        this._line = value;
    }

    get ascendingOrder(): boolean|undefined {
        return this._ascendingOrder;
    }

    set ascendingOrder(value: boolean) {
        this._ascendingOrder = value;
    }

    get departure(): Date|undefined {
        return this._departure;
    }

    set departure(value: Date) {
        this._departure = value;
    }
}
