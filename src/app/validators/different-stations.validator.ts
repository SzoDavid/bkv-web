import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class DifferentStationsValidator {
    static differentStations(controlName: string, otherControlName: string): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const control = formGroup.get(controlName);
            const otherControl = formGroup.get(otherControlName);

            if (!control || !otherControl) {
                return null;
            }

            if (control.value === otherControl.value) {
                otherControl.setErrors({ stationMatch: true });
                return { stationMatch: true };
            } else {
                otherControl.setErrors(null);
                return null;
            }
        };
    }
}
