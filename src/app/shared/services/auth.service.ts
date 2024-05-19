import {Injectable} from '@angular/core';
import {map} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private _auth: AngularFireAuth) {}

    login(email: string, password: string){
        return this._auth.signInWithEmailAndPassword(email, password);
    }

    logout(): Promise<void> {
        return this._auth.signOut();
    }

    signup(email: string, password: string){
        return this._auth.createUserWithEmailAndPassword(email, password);
    }

    getUser() {
        return this._auth.user;
    }

    isLoggedIn() {
        return this._auth.authState.pipe(map(user => !!user));
    }
}
