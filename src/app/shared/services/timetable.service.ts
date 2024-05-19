import {Station} from "../models/station.model";
import {Train} from "../models/train.model";
import {TimetableElement} from "../models/timetableElement.model";

export class TimetableService {
    static calculate(train: Train, start: Station, destination: Station): Promise<TimetableElement[]> {
        return new Promise<TimetableElement[]>((resolve, reject) => {
            const stations = train.line!.stations;
            const timetable: TimetableElement[] = [];

            const startIndex = stations.findIndex(stop => stop.station?.id === start.id);
            const destinationIndex = stations.findIndex(stop => stop.station?.id === destination.id);

            if (startIndex < destinationIndex !== train.ascendingOrder) {
                reject(new Error('Failed to parse timetable: Invalid train direction'));
                return;
            }

            if (train.ascendingOrder) {
                for (let i = startIndex; i <= destinationIndex; i++) {
                    const stop = stations[i];

                    if (!stop || stop.durationMinutes === undefined || !stop.station) {
                        reject(new Error('Failed to parse timetable: stop is undefined'));
                        return;
                    }

                    const date = new Date(train.departure!);
                    date.setMinutes(date.getMinutes() + stop.durationMinutes);

                    timetable.push(new TimetableElement(stop.station, date));
                }
            } else {
                const lastStopTime = stations[stations.length - 1].durationMinutes;

                if (!lastStopTime) {
                    reject(new Error('Failed to parse timetable: lastStopTime is undefined'));
                    return;
                }

                for (let i = startIndex; i >= destinationIndex; i--) {
                    const stop = stations[i];

                    if (!stop || stop.durationMinutes === undefined || !stop.station) {
                        reject(new Error('Failed to parse timetable: stop is undefined'));
                        return;
                    }

                    const date = new Date(train.departure!);
                    date.setMinutes(date.getMinutes() + lastStopTime - stop.durationMinutes);

                    timetable.push(new TimetableElement(stop.station, date));
                }
            }
            resolve(timetable);
            return;
        });
    }

    static calculateForTrain(train: Train): Promise<TimetableElement[]> {
        return new Promise<TimetableElement[]>((resolve, reject) => {
            const stations = train.line!.stations;
            const startStation = stations[train.ascendingOrder ? 0 : stations.length - 1].station;
            const destinationStation = stations[train.ascendingOrder ? stations.length - 1 : 0].station;

            if (!startStation || !destinationStation) {
                reject(new Error('Failed to parse timetable:  Start and end stations are undefined'));
                return;
            }

            resolve(this.calculate(train, startStation, destinationStation));
            return;
        });
    }
}
