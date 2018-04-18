import { ValidatorFn, AbstractControl } from "@angular/forms";

export class VerifierCaracteresValidator {
    static sansEspaces(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            c.value.trim();
            return { 'sansEspaces': c.value != "" ? true : false};
        };
    }
}