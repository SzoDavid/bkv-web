import {Component} from '@angular/core';
import {Reservation} from "../../../shared/models/reservation.model";
import {Station} from "../../../shared/models/station.model";
import {Train} from "../../../shared/models/train.model";
import {RailLine} from "../../../shared/models/railLine.model";
import {Stop} from "../../../shared/models/stop.model";
import {User} from "../../../shared/models/user.model";

@Component({
    selector: 'app-all',
    templateUrl: './all.component.html',
    styleUrl: './all.component.scss'
})
export class AllComponent {
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
