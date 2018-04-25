import { VerifierCaracteresValidator } from "./caracteres-validator";
import { AbstractControl } from "@angular/forms";

describe('sansEspaces Validator', () => {
    it('chaine vide est invalide', () => {
        let control = { value: '' };
        let validator = VerifierCaracteresValidator.longueurValide(3);
        let result = validator(control as AbstractControl);
        expect(result['valide']).toBe(false);
    });

    it('chaine vide est invalide', () => {
        let control = { value: '          ' };
        let validator = VerifierCaracteresValidator.longueurValide(3);
        let result = validator(control as AbstractControl);
        expect(result['valide']).toBe(false);
    });

    it('chaine vide est invalide', () => {
        let control = { value: 'bon matin' };
        let validator = VerifierCaracteresValidator.longueurValide(3);
        let result = validator(control as AbstractControl);
        expect(result['valide']).toBe(true);
    });

    it('chaine vide est invalide', () => {
        let control = { value: 'bon matin   des mots   ' };
        let validator = VerifierCaracteresValidator.longueurValide(3);
        let result = validator(control as AbstractControl);
        expect(result['valide']).toBe(true);
    });
});