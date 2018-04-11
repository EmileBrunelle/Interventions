import { VerifierNombresValidator } from "./nombre-validator";

describe('Nombre Validator', () => {
    it('plage pour la valeur valide limite 1', () => {
        let validator = VerifierNombresValidator.plage();
        let result = validator(null);
        expect(validator['plage']).toBe(true);
    })
});