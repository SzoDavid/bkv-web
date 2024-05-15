import {Reservation} from "../../models/reservation.model";
import {Observable} from "rxjs";
import {User} from "../../models/user.model";

export interface ReservationService {
    create(reservation: Reservation): Observable<Reservation>;
    delete(id: String): Observable<Reservation>;
    getById(id: String): Observable<Reservation>;
    getAllByUser(user: User): Observable<Reservation[]>;
}
