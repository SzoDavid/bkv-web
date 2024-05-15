import {Train} from "./train.model";
import {TimeTableElement} from "./timeTableElement.model";

export class TrainSearchResult {
    private _train: Train;
    private _start: TimeTableElement;
    private _destination: TimeTableElement;

    constructor(train: Train, start: TimeTableElement, destination: TimeTableElement) {
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

    get start(): TimeTableElement {
        return this._start;
    }

    set start(value: TimeTableElement) {
        this._start = value;
    }

    get destination(): TimeTableElement {
        return this._destination;
    }

    set destination(value: TimeTableElement) {
        this._destination = value;
    }
}
