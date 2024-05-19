import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SearchParameters} from "../../../shared/models/searchParameters.model";
import {RailLineService} from "../../../shared/services/rail-line.service";
import {TrainService} from "../../../shared/services/train.service";
import {TrainSearchResult} from "../../../shared/models/trainSearchResult.model";
import {TimetableService} from "../../../shared/services/timetable.service";
import { Observable } from 'rxjs';
import {UserService} from "../../../shared/services/user.service";
import {ReservationService} from "../../../shared/services/reservation.service";
import {AuthService} from "../../../shared/services/auth.service";
import {Reservation} from "../../../shared/models/reservation.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnChanges {
    @Input() searchParameters?: Observable<SearchParameters>;
    searchResults = new Array<TrainSearchResult>();

    constructor(private _router: Router,
                private _railLineService: RailLineService,
                private _trainService: TrainService,
                private _authService: AuthService,
                private _userService: UserService,
                private _reservationService: ReservationService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['searchParameters'] && this.searchParameters) {
            this.searchParameters.subscribe((params: SearchParameters) => {
                this.searchResults = [];
                if (!params || !params.date || !params.from || !params.to) return;
                this._railLineService.getAllByStartAndDestinationStations(params.from, params.to).subscribe(lines => {
                    for (let line of lines) {
                        const stations = line.stations;
                        const startIndex = stations.findIndex(stop => stop.station?.id === params.from!.id);
                        const destinationIndex = stations.findIndex(stop => stop.station?.id === params.to!.id);

                        this._trainService.getAllByRailLineDirectionAndDate(line, startIndex < destinationIndex, params.date!).subscribe(trains => {
                            for (let train of trains) {
                                train.line?.reference?.get().then(lineDoc => {
                                    train.line = RailLineService.parseRailLine(lineDoc);
                                    TimetableService.calculate(train, params.from!, params.to!).then(timetable => {
                                        this.searchResults.push(new TrainSearchResult(train, timetable.at(0)!, timetable.at(timetable.length - 1)!));
                                    });
                                }).catch(error => {
                                    console.error(error);
                                });
                            }
                        });
                    }
                });
            });
        }
    }

    onAddClick(train: TrainSearchResult) {
        this._authService.getUser().subscribe(user => {
            if (!user) return;
            this._userService.getByAuthId(user.uid).subscribe(user=> {
                if (!user) return;
                const reservation = new Reservation(
                    '', train.start.station, train.destination.station, train.train, user);
                this._reservationService.create(reservation).then(_ => {
                    this._router.navigateByUrl('/reservations/all');
                });
            })
        })

    }
}
