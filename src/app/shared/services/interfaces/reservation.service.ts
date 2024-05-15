import {Reservation} from "../../models/reservation.model";
import {User} from "../../models/user.model";

export interface ReservationService {
    create(reservation: Reservation): Promise<Reservation>;
    delete(id: String): Promise<Reservation>;
    getById(id: String): Promise<Reservation>;
    getAllByUser(user: User): Promise<Reservation[]>;
}
