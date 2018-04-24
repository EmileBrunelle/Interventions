import { ITypeProbleme } from "./TypeProbleme";
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class TypeProblemeData implements InMemoryDbService {
    createDb() {
        let typesProblemes: ITypeProbleme[] = [
            {
                'id': 1,
                'descriptionTypeProbleme': 'La souris est tombé dans un piège'
            },
            {
                'id': 2,
                'descriptionTypeProbleme': 'Le chat s\'est couché sur mon clavier'
            },
            {
                'id': 3,
                'descriptionTypeProbleme': 'Un oiseau a grugé mon fil d\'Internet'
            },
            {
                'id': 4,
                'descriptionTypeProbleme': 'J\'ai laissé mon petit frère toucher à mon ordi'
            },
            {
                'id': 5,
                'descriptionTypeProbleme': 'Un serpent est bloqué dans l\'imprimante'
            },
            {
                'id': 6,
                'descriptionTypeProbleme': 'Ma carte graphique ne veut plus faire de minage de Bitcoin'
            },
            {
                'id': 7,
                'descriptionTypeProbleme': 'Ma carte mère s\'est chicané avec mon processeur'
            },
            {
                'id': 8,
                'descriptionTypeProbleme': 'Autre'
            },
        ];
        return {typesProblemes};        
    }
}