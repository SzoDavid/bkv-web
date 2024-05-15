import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private _router: Router, private fb: FormBuilder) {
        this.loginForm = this.fb.group(
            {
                email: ['', [Validators.required]],
                password: ['', [Validators.required]]
            });
    }

    getFieldValue(field: string): any {
        return this.loginForm.get(field)?.value;
    }

    login() {
        if (this.loginForm.invalid) return;

        if (this.getFieldValue('email') === 'asd@asd.asd' && this.getFieldValue('password') === 'asd') {
            this._router.navigateByUrl('/');
        }
    }
}
