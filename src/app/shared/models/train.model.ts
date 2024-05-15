import {RailLine} from "./railLine.model";

export class Train {
    private _id: string;
    private _name: string;
    private _line: RailLine;
    private _ascendingOrder: boolean;
    private _departure: Date;

    constructor(id: string, name: string, line: RailLine, ascendingOrder: boolean, departure: Date) {
        this._id = id;
        this._name = name;
        this._line = line;
        this._ascendingOrder = ascendingOrder;
        this._departure = departure;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get line(): RailLine {
        return this._line;
    }

    set line(value: RailLine) {
        this._line = value;
    }

    get ascendingOrder(): boolean {
        return this._ascendingOrder;
    }

    set ascendingOrder(value: boolean) {
        this._ascendingOrder = value;
    }

    get departure(): Date {
        return this._departure;
    }

    set departure(value: Date) {
        this._departure = value;
    }
}
