import {Reservation} from "../models/reservation.model";
import {User} from "../models/user.model";
import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {catchError, map, Observable, switchMap, throwError} from "rxjs";
import {Station} from "../models/station.model";
import {Train} from "../models/train.model";
import {UserService} from "./user.service";
import {TrainService} from "./train.service";
import {RailLineService} from "./rail-line.service";

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    private static _collectionPath = 'reservations';
    private static _fromStationField = 'from';
    private static _toStationField = 'to';
    private static _stationField = 'station';
    private static _stationNameField = 'stationName';
    private static _trainField = 'train';
    private static _trainNameField = 'trainName';
    private static _departTimeField = 'departTime';
    private static _userField = 'user';

    constructor(private _afs: AngularFirestore) {}

    create(reservation: Reservation): Promise<any> {
        const reservationSaveObject: any = {
            departTime: reservation.train!.departure,
            from: {
                station: this._afs.doc(`stations/${reservation.from!.id}`).ref,
                stationName: reservation.from!.name
            },
            to: {
                station: this._afs.doc(`stations/${reservation.to!.id}`).ref,
                stationName: reservation.to!.name
            },
            train: reservation.train!.reference,
            trainName: reservation.train!.name,
            user: this._afs.doc(`users/${reservation.user!.id}`).ref
        };

        return this._afs.collection(ReservationService.collectionPath)
            .add(reservationSaveObject)
            .then(docRef => docRef, error => {
                console.error('Failed to create reservation:', error);
                return throwError(() => new Error('Failed to create reservation'));
            });
    }

    delete(id: string): Promise<any> {
        return this._afs.collection(ReservationService.collectionPath)
            .doc(id)
            .delete()
            .then(() => {}, error => {
                console.error('Failed to delete reservation:', error);
                return throwError(() => new Error('Failed to delete reservation'));
            });
    }

    getById(id: string): Observable<Reservation> {
        return this._afs.collection(ReservationService.collectionPath).doc(id).get().pipe(
            switchMap(doc => {
                if (!doc.exists) {
                    throw new Error('Reservation not found');
                }
                const reservation = ReservationService.parseReservation(doc);

                return this._afs.doc(reservation.user!.reference!.path).get().pipe(
                    switchMap(userDoc => {
                        const user = UserService.parseUser(userDoc);

                        if (!user) {
                            throw new Error('Failed to parse reservation: user not found');
                        }

                        reservation.user = user;

                        return this._afs.doc(reservation.train!.reference!.path).get().pipe(
                            switchMap(trainDoc => {
                                reservation.train = TrainService.parseTrain(trainDoc);

                                return this._afs.doc(reservation.train!.line!.reference!.path).get().pipe(
                                    map(lineDoc => {
                                        reservation.train!.line = RailLineService.parseRailLine(lineDoc);
                                        return reservation;
                                    })
                                );
                            })
                        );
                    })
                );
            }),
            catchError(error => {
                console.error('Failed to get reservation:', error);
                return throwError(() => new Error('Failed to get reservation'));
            })
        );
    }

    getAllByUser(user: User): Observable<Reservation[]> {
        return this._afs.collection(ReservationService.collectionPath, ref => ref
            .where(ReservationService.userField, '==', this._afs.doc(`users/${user.id}`).ref))
            .get()
            .pipe(
                map(querySnapshot => {
                    const reservations: Reservation[] = [];
                    querySnapshot.forEach(doc => {
                        reservations.push(ReservationService.parseReservation(doc));
                    });
                    return reservations;
                }),
                catchError(error => {
                    console.error('Failed to get reservations:', error);
                    return throwError(() => new Error('Failed to get reservations'));
                })
            );
    }

    public static parseReservation(doc: any): Reservation {
        if (!doc.exists) {
            throw new Error('Reservation document does not exist');
        }

        const data = doc.data();
        const reservation = new Reservation(
            doc.id,
            new Station(
                data[this.fromStationField][this.stationField].id,
                data[this.fromStationField][this.stationNameField]
            ),
            new Station(
                data[this.toStationField][this.stationField].id,
                data[this.toStationField][this.stationNameField]
            ),
            new Train(
                data[this.trainField],
                data[this.trainField].id,
                data[this.trainNameField],
                undefined,
                undefined,
                data[this.departTimeField].toDate()
            ),
            new User(
                data[this.userField],
                data[this.userField].id
            )
        );

        if (!reservation.id || !reservation.from!.id || !reservation.from!.name || !reservation.to!.id || !reservation.to!.name ||
            !reservation.train!.id || !reservation.train!.name || !reservation.train!.departure || !reservation.user!.reference) {
            throw new Error('Failed to parse reservation');
        }

        return reservation;
    }


    static get collectionPath(): string {
        return this._collectionPath;
    }

    static get fromStationField(): string {
        return this._fromStationField;
    }

    static get toStationField(): string {
        return this._toStationField;
    }

    static get stationField(): string {
        return this._stationField;
    }

    static get stationNameField(): string {
        return this._stationNameField;
    }

    static get trainField(): string {
        return this._trainField;
    }

    static get trainNameField(): string {
        return this._trainNameField;
    }

    static get departTimeField(): string {
        return this._departTimeField;
    }

    static get userField(): string {
        return this._userField;
    }
}
