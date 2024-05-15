export class ReservationSave {
    private _departTime: Date;
    private _from: any;
    private _to: any;
    private _train: any;
    private _trainName: string;
    private _user: any;

    constructor(departTime: Date, from: any, to: any, train: any, trainName: string, user: any) {
        this._departTime = departTime;
        this._from = from;
        this._to = to;
        this._train = train;
        this._trainName = trainName;
        this._user = user;
    }

    get departTime(): Date {
        return this._departTime;
    }

    set departTime(value: Date) {
        this._departTime = value;
    }

    get from(): any {
        return this._from;
    }

    set from(value: any) {
        this._from = value;
    }

    get to(): any {
        return this._to;
    }

    set to(value: any) {
        this._to = value;
    }

    get train(): any {
        return this._train;
    }

    set train(value: any) {
        this._train = value;
    }

    get trainName(): string {
        return this._trainName;
    }

    set trainName(value: string) {
        this._trainName = value;
    }

    get user(): any {
        return this._user;
    }

    set user(value: any) {
        this._user = value;
    }
}
