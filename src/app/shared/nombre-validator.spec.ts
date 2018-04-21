import { VerifierNombresValidator } from "./nombre-validator";
import { AbstractControl } from "@angular/forms";

describe('Nombre Validator', () => {
    it('plage pour la valeur valide limite 1', () => {
        let control = { value: 1 };
        let validator = VerifierNombresValidator.plage(1, 5);
        let result = validator(control as AbstractControl);
        expect(result['plage']).toBe(true);
    });

    it('plage pour la valeur invalide limite 0', () => {
        let control = { value: 0 };
        let validator = VerifierNombresValidator.plage(1, 5);
        let result = validator(control as AbstractControl);
        expect(result['plage']).toBe(false);
    });
});