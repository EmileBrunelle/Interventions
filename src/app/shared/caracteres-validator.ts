import { ValidatorFn, AbstractControl } from "@angular/forms";

export class VerifierCaracteresValidator {
    static longueurValide(min: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if(c.value == null || c.value.trim().length < min || c.value == '') {
                return { 'valide': false }
            } else {
                return { 'valide': true }
            }
        };
    }
}