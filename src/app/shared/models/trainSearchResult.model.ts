import {Train} from "./train.model";
import {TimetableElement} from "./timetableElement.model";

export class TrainSearchResult {
    private _train: Train;
    private _start: TimetableElement;
    private _destination: TimetableElement;

    constructor(train: Train, start: TimetableElement, destination: TimetableElement) {
        this._train = train;
        this._start = start;
        this._destination = destination;
    }

    get train(): Train {
        return this._train;
    }

    set train(value: Train) {
        this._train = value;
    }

    get start(): TimetableElement {
        return this._start;
    }

    set start(value: TimetableElement) {
        this._start = value;
    }

    get destination(): TimetableElement {
        return this._destination;
    }

    set destination(value: TimetableElement) {
        this._destination = value;
    }
}
