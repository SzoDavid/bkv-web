import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
    reservationId: string = '';

    constructor(private _actRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this._actRoute.params.subscribe((param: any) => {
           this.reservationId = param.reservationId as string;
           console.log(this.reservationId);
        });
    }
}
