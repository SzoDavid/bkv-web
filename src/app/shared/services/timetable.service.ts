import {Station} from "../models/station.model";
import {Train} from "../models/train.model";
import {TimetableElement} from "../models/timetableElement.model";

export class TimetableService {
    static calculate(train: Train, start: Station, destination: Station): TimetableElement[] {
        const stations = train.line.stations;
        const timetable: TimetableElement[] = [];

        const startIndex = stations.findIndex(stop => stop.station === start);
        const destinationIndex = stations.findIndex(stop => stop.station === destination);

        if (startIndex < destinationIndex !== train.ascendingOrder) {
            throw new Error('Invalid train direction');
        }

        if (train.ascendingOrder) {
            for (let i = startIndex; i <= destinationIndex; i++) {
                const stop = stations[i];

                const date = new Date(train.departure);
                date.setMinutes(date.getMinutes() + stop.durationMinutes);

                timetable.push(new TimetableElement(stop.station, date));
            }
        } else {
            const lastStopTime = stations[stations.length - 1].durationMinutes;
            for (let i = startIndex; i >= destinationIndex; i--) {
                const stop = stations[i];

                const date = new Date(train.departure);
                date.setMinutes(date.getMinutes() + lastStopTime - stop.durationMinutes);

                timetable.push(new TimetableElement(stop.station, date));
            }
        }

        return timetable;
    }

    static calculateForTrain(train: Train): TimetableElement[] {
        const stations = train.line.stations;
        const startStation = stations[train.ascendingOrder ? 0 : stations.length - 1].station;
        const destinationStation = stations[train.ascendingOrder ? stations.length - 1 : 0].station;

        return this.calculate(train, startStation, destinationStation);

    }
}
