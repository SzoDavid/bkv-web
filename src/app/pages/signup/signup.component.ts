import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatchPasswordValidator} from "../../validators/match-password.validator";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent {
    signUpForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.signUpForm = this.fb.group(
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

    signup() {
        if (this.signUpForm.invalid) return;

        console.log(this.signUpForm.value);
    }
}
