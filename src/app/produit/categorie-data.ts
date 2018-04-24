import { ICategorie } from "./categorie";
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class CategorieData implements InMemoryDbService {
    createDb() {
        let categories: ICategorie[] = [
            {
                'id': 1,
                'descriptionCategorie': 'Desserts'
            },
            {
                'id': 2,
                'descriptionCategorie': 'Charcuteries'
            },
            {
                'id': 2,
                'descriptionCategorie': 'Fruits et légumes'
            }
        ];
        return {categories};        
    }
}