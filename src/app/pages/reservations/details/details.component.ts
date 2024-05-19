import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Reservation} from "../../../shared/models/reservation.model";
import {ReservationService} from "../../../shared/services/reservation.service";
import {TimetableService} from "../../../shared/services/timetable.service";
import {TimetableElement} from "../../../shared/models/timetableElement.model";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
    private _reservationId: string = '';
    reservation?: Reservation;
    timetable = new Array<TimetableElement>();

    constructor(private _actRoute: ActivatedRoute,
                private _router: Router,
                private _reservationService: ReservationService) {}

    ngOnInit(): void {
        this._actRoute.params.subscribe((param: any) => {
           this._reservationId = param.reservationId as string;

           this.loadData();
        });
    }

    loadData() {
        this._reservationService.getById(this._reservationId).subscribe(reservation => {
            this.reservation = reservation;

            console.log(reservation);

            TimetableService.calculate(reservation.train, reservation.from, reservation.to).then(timetable => {
                this.timetable = timetable;
            }).catch(error => {
                console.error(error);
            });
        })
    }

    onDelete(reservation: Reservation|undefined) {
        if (!reservation) return;

        this._reservationService.delete(reservation.id).then(_ => {
                this._router.navigateByUrl('/reservations/all');
        }).catch(error => {
            console.error(error);
        });
    }
}
