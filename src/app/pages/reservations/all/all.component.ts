import {Component} from '@angular/core';
import {Reservation} from "../../../shared/models/reservation.model";
import {AuthService} from "../../../shared/services/auth.service";
import {UserService} from "../../../shared/services/user.service";
import {ReservationService} from "../../../shared/services/reservation.service";

@Component({
    selector: 'app-all',
    templateUrl: './all.component.html',
    styleUrl: './all.component.scss'
})
export class AllComponent {
    reservations: Array<Reservation>;

    constructor(private _authService: AuthService, private _userService: UserService, private _reservationService: ReservationService) {
        this.reservations = new Array<Reservation>();

        this.loadData();
    }

    loadData() {
        this._authService.getUser().subscribe(user => {
            if (!user) return;

            this._userService.getByAuthId(user.uid).subscribe(user => {
                if(!user) return;

                this._reservationService.getAllByUser(user).subscribe(reservations => {
                    this.reservations = reservations;
                });
            });
        });
    }
}
