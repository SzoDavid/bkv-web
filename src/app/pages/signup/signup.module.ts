import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SignupRoutingModule} from './signup-routing.module';
import {SignupComponent} from './signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";


@NgModule({
    declarations: [
        SignupComponent
    ],
    imports: [
        CommonModule,
        SignupRoutingModule,
        ReactiveFormsModule,
        MatProgressSpinner,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
    ]
})
export class SignupModule {
}
