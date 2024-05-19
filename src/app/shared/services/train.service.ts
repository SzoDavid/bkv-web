import {RailLine} from "../models/railLine.model";
import {Train} from "../models/train.model";
import {Injectable} from "@angular/core";
import {catchError, map, Observable, throwError} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})
export class TrainService {
    private static _collectionPath = 'trains';
    private static _nameField = 'name';
    private static _ascendingDirectionField = 'ascendingDirection';
    private static _departTimeField = 'departureTime';
    private static _lineField = 'line';

    constructor(private _afs: AngularFirestore) {}

    getAllByRailLineDirectionAndDate(line: RailLine, ascendingDirection: boolean, date: Date): Observable<Train[]> {
        const startDateTime = new Date(date.setHours(0, 0, 0, 0));
        const endDateTime = new Date(date.setHours(23, 59, 59, 999));

        return this._afs.collection(TrainService.collectionPath, ref => ref
            .where(TrainService.departTimeField, '>=', startDateTime)
            .where(TrainService.departTimeField, '<=', endDateTime)
            .where(TrainService.ascendingDirectionField, '==', ascendingDirection)
            .where(TrainService.lineField, '==', this._afs.doc(`railLines/${line.id}`).ref)
            .orderBy(TrainService.departTimeField)
        ).get().pipe(
            map(querySnapshot => {
                const trains: Train[] = [];
                querySnapshot.forEach(doc => {
                    trains.push(TrainService.parseTrain(doc));
                });
                return trains;
            }),
            catchError(error => {
                console.error('Failed to get trains:', error);
                return throwError(() => new Error('Failed to get trains'));
            })
        );
    }

    static parseTrain(doc: any): Train {
        if (!doc.exists) {
            throw new Error('Train document does not exist');
        }

        const data = doc.data();
        const train = new Train(
            doc.ref,
            doc.id,
            data[this.nameField],
            new RailLine(data[this.lineField], data[this.lineField].id),
            data[this.ascendingDirectionField],
            data[this.departTimeField].toDate()
        );

        if (!train.id || !train.name || !train.departure || !train.line || !train.line.id) {
            throw new Error('Failed to parse train');
        }

        return train;
    }

    static get collectionPath(): string {
        return this._collectionPath;
    }

    static get nameField(): string {
        return this._nameField;
    }

    static get ascendingDirectionField(): string {
        return this._ascendingDirectionField;
    }

    static get departTimeField(): string {
        return this._departTimeField;
    }

    static get lineField(): string {
        return this._lineField;
    }
}
