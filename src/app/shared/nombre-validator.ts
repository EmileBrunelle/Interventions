import { ValidatorFn, AbstractControl } from "@angular/forms";

export class VerifierNombresValidator {
    static plage(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value >= 1 && c.value <=5) {
                return { 'plage':true };
            }
            return { 'plage':false };
        };
    }
}