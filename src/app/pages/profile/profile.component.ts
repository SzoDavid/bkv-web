import {Component} from '@angular/core';
import {User} from "../../shared/models/user.model";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    user: User;
    name: string;

    constructor() {
        this.user = new User("id", "authId", "email", "name");
        this.name = this.user.name;
    }

    onSave() {
        this.user.name = this.name;
        console.log(this.user);
    }
}
