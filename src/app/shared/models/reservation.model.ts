import {Station} from "./station.model";
import {Train} from "./train.model";
import {User} from "./user.model";

export class Reservation {
    private _id: string;
    private _from: Station;
    private _to: Station;
    private _train: Train;
    private _user: User;

    constructor(id: string, from: Station, to: Station, train: Train, user: User) {
        this._id = id;
        this._from = from;
        this._to = to;
        this._train = train;
        this._user = user;
    }
    
    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get from(): Station {
        return this._from;
    }

    set from(value: Station) {
        this._from = value;
    }

    get to(): Station {
        return this._to;
    }

    set to(value: Station) {
        this._to = value;
    }

    get train(): Train {
        return this._train;
    }

    set train(value: Train) {
        this._train = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }
}
