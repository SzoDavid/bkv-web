export class User {
    private _id: string;
    private _authId: string;
    private _email: string;
    private _name: string;

    constructor(id: string, authId: string, email: string, name: string) {
        this._id = id;
        this._authId = authId;
        this._email = email;
        this._name = name;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get authId(): string {
        return this._authId;
    }

    set authId(value: string) {
        this._authId = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}
