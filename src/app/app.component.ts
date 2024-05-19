import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./shared/services/auth.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    routes: Array<string> = new Array<string>();
    loggedIn = false;

    constructor(private _router: Router, private _authService: AuthService) {}

    ngOnInit() {
        this.routes = this._router.config.map(conf => conf.path) as string[];

        this._authService.isLoggedIn().subscribe(isLoggedIn => {
            this.loggedIn = isLoggedIn;
        })
    }

    changePage(selectedPage: string) {
        this._router.navigateByUrl(selectedPage);
    }

    onToggleSidenav(sidenav: MatSidenav) {
        sidenav.toggle();
    }

    onSidenavClose(event: any, sidenav: MatSidenav) {
        if (event === true) {
            sidenav.close();
        }
    }
}
