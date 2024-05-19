import {RailLine} from "../models/railLine.model";
import {Station} from "../models/station.model";
import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Stop} from "../models/stop.model";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RailLineService {
    private static _collectionPath = 'railLines';
    private static _stationsField = 'stations';
    private static _stationRefsField = 'stationRefs';
    private static _durationMinutesField = 'durationMinutes';
    private static _stationField = 'station';
    private static _stationNameField = 'stationName';

    constructor(private _afs: AngularFirestore) {}

    getById(id: string): Observable<RailLine> {
        return this._afs.collection(RailLineService.collectionPath).doc(id).get().pipe(
            map(doc => {
                if (!doc.exists) {
                    throw new Error('Rail line not found');
                }

                return RailLineService.parseRailLine(doc);
            }),
            catchError(error => {
                console.error('Failed to get rail line:', error);
                return throwError(() => new Error('Failed to get rail line'));
            })
        );
    }

    getAllByStartAndDestinationStations(start: Station, destination: Station): Observable<RailLine[]> {
        const startStationRef = this._afs.collection('stations').doc(start.id).ref;

        return this._afs.collection(RailLineService.collectionPath,
                ref => ref.where(RailLineService.stationRefsField, 'array-contains', startStationRef))
            .get()
            .pipe(
                map(querySnapshot => {
                    const railLines: RailLine[] = [];
                    querySnapshot.forEach(doc => {
                        const railLine = RailLineService.parseRailLine(doc);
                        if (railLine.stations.some(stop => stop.station?.id === destination.id)) {
                            railLines.push(railLine);
                        }
                    });
                    return railLines;
                }),
                catchError(error => {
                    console.error('Failed to get rail lines:', error);
                    return throwError(() => new Error('Failed to get rail lines'));
                })
            );
    }

    public static parseRailLine(doc: any): RailLine {
        const railLine = new RailLine();
        railLine.id = doc.id;
        railLine.stations = [];

        const stationMaps = doc.data()[this.stationsField];
        stationMaps.forEach((stationMap: any) => {
            const stop = new Stop();
            stop.station = new Station(stationMap[this.stationField].id, stationMap[this.stationNameField]);
            stop.durationMinutes = stationMap[this.durationMinutesField];
            railLine.stations.push(stop);
        });

        if (!railLine.id || !railLine.stations || railLine.stations.length === 0) {
            throw new Error('Failed to parse rail line');
        }

        return railLine;
    }


    static get collectionPath(): string {
        return this._collectionPath;
    }

    static get stationsField(): string {
        return this._stationsField;
    }

    static get stationRefsField(): string {
        return this._stationRefsField;
    }

    static get durationMinutesField(): string {
        return this._durationMinutesField;
    }

    static get stationField(): string {
        return this._stationField;
    }

    static get stationNameField(): string {
        return this._stationNameField;
    }
}
