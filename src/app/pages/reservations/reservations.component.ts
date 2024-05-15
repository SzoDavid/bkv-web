import {Component} from '@angular/core';
import {Station} from "../../shared/models/station.model";
import {Train} from "../../shared/models/train.model";
import {RailLine} from "../../shared/models/railLine.model";
import {User} from "../../shared/models/user.model";
import {Stop} from "../../shared/models/stop.model";
import {Reservation} from "../../shared/models/reservation.model";

@Component({
    selector: 'app-reservations',
    templateUrl: './reservations.component.html',
    styleUrl: './reservations.component.scss'
})
export class ReservationsComponent {
    reservations: Array<Reservation>;

    constructor() {
        this.reservations = new Array<Reservation>();

        this.loadData();
    }

    loadData() {
        for (let i = 0; i < 10; i++) {
            this.reservations.push(new Reservation(
                'id' + i,
                new Station('stationA' + i, 'stationA' + i),
                new Station('stationB' + i, 'stationB' + i),
                new Train(
                    'train' + i,
                    'train' + i,
                    new RailLine('line' + i, new Array<Stop>()),
                    true,
                    new Date()),
                new User('userId' + i, 'authId' + i, 'email' + i, 'name' + i)));
        }
    }
}
