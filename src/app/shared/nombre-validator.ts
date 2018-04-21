import { ValidatorFn, AbstractControl } from "@angular/forms";

export class VerifierNombresValidator {
    static plage(min: number, max: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value >= min && c.value <= max) {
                return { 'plage':true };
            }
            return { 'plage':false };
        };
    }
}