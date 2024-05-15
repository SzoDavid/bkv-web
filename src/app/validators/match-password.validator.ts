import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class MatchPasswordValidator {
    static matchPassword(controlName: string, matchingControlName: string): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const control = formGroup.get(controlName);
            const matchingControl = formGroup.get(matchingControlName);

            if (!control || !matchingControl) {
                return null;
            }

            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ passwordMismatch: true });
                return { passwordMismatch: true };
            } else {
                matchingControl.setErrors(null);
                return null;
            }
        };
    }
}
