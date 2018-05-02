import { VerifierCaracteresValidator } from "./caracteres-validator";
import { AbstractControl } from "@angular/forms";

describe('sansEspaces Validator', () => {
    it('champ vide est invalide', () => {
        let control = { value: '' };
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(false);
    });

    it('chaine vide est invalide', () => {
        let control = { value: '          ' };
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(false);
    });

    it('chaine non vide est valide', () => {
        let control = { value: 'bon matin' };
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result).toBe(null);
    });

    it('chaine non vide avec des espaces', () => {
        let control = { value: 'bon matin   des mots   ' };
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result).toBe(null);
    });
});