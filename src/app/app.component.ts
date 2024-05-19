import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {AuthService} from "./shared/services/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    page = '';
    routes: Array<string> = new Array<string>();

    constructor(private _router: Router, private _authService: AuthService) {}

    ngOnInit() {
        this.routes = this._router.config.map(conf => conf.path) as string[];

        this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
            const currentPage = (event.urlAfterRedirects as string).split('/')[1] as string;
            if (this.routes.includes(currentPage)) {
                this.page = currentPage;
            }
        });
    }

    changePage(selectedPage: string) {
        // this.page = selectedPage;
        this._router.navigateByUrl(selectedPage);
    }
}
