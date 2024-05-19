import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatchPasswordValidator} from "../../validators/match-password.validator";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../shared/models/user.model";
import {UserService} from "../../shared/services/user.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent {
    signUpForm: FormGroup;

    constructor(private _fb: FormBuilder,
                private _authService: AuthService,
                private _router: Router,
                private _userService: UserService) {
        this.signUpForm = this._fb.group(
            {
                fullName: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, this.validatePassword]],
                passwordAgain: ['', [Validators.required]]
            }, {
                validators: MatchPasswordValidator.matchPassword('password', 'passwordAgain')
            });
    }

    validatePassword(control: any) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(control.value) ? null : {invalidPassword: true};
    }

    getFieldValue(field: string): any {
        return this.signUpForm.get(field)?.value;
    }

    onSignup() {
        if (this.signUpForm.invalid) return;

        this._authService.signup(this.getFieldValue('email'),
                                 this.getFieldValue('password'))
            .then(cred => {
                const user = new User(
                    undefined,
                    undefined,
                    cred.user?.uid as string,
                    this.getFieldValue('email'),
                    this.getFieldValue('fullName')
                );

                this._userService.create(user).then(_ => {
                    this._router.navigateByUrl('/');
                }).catch(error => {
                    console.error(error);
                })
            }).catch(error => {
                console.error(error);
            });
    }
}
