import {Station} from "../models/station.model";
import {Injectable} from "@angular/core";
import {catchError, map, Observable, throwError} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})
export class StationService {
    collectionPath = 'stations';
    nameField = 'name';

    constructor(private _afs: AngularFirestore) {}

    getAll(): Observable<Station[]> {
        return this._afs.collection<Station>(this.collectionPath,
                                     ref => ref.orderBy(this.nameField)).get()
            .pipe(
                map(snapshot => {
                    if (snapshot.empty) {
                        return [];
                    }

                    return snapshot.docs.map(doc => StationService.parseStation(doc));
                }),
                catchError(error => {
                    console.error('Failed to get stations:', error);
                    return throwError(() => new Error('Failed to get stations'));
                })
            );
    }

    public static parseStation(doc: any): Station {
        if (!doc.exists) {
            throw new Error('Document does not exist');
        }

        const station = doc.data() as Station;
        station.id = doc.id;

        if (!station || !station.name) {
            console.error('Failed to parse station');
            throw new Error('Failed to parse station');
        }

        return station;
    }
}
