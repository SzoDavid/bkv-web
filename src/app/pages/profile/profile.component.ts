import {Component} from '@angular/core';
import {User} from "../../shared/models/user.model";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    user: User;
    name: string;

    constructor(private _router: Router, private _authService: AuthService, private _userService: UserService) {
        this.user = new User();
        this.name = this.user.name;

        this.loadData();
    }

    loadData() {
        this._authService.getUser().subscribe(user => {
            if (!user) return;
            this._userService.getByAuthId(user.uid).subscribe(user => {
                if (!user) return;
                this.user = user;
                this.name = this.user.name;
            });
        });
    }

    onSave() {
        this.user.name = this.name;
        this._userService.update(this.user).then(_ => {
            alert('Mentés sikeres');
            this.loadData();
        }).catch(error => {
            console.error(error);
        });
    }

    onLogout() {
        this._authService.logout().then(_ => {
            this._router.navigateByUrl('/login');
        }).catch(error => {
            console.error(error);
        });
    }
}
