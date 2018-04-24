import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierNombresValidator } from '../shared/nombre-validator';
import { CategorieService } from './categorie.service';
import { ICategorie } from './categorie';

@Component({
  selector: 'Inter-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produitForm: FormGroup;
  categoriesProduits: ICategorie[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private categories: CategorieService) { }

  ngOnInit() {
    this.produitForm = this.fb.group({
      nomProduit: ['', [Validators.minLength(5)]],
      quantite: ['', [VerifierNombresValidator.plage(1, 5)]],
      noCategorie: ['']
    });

    this.categories.obtenirCategories()
    .subscribe(cat => this.categoriesProduits = cat,
              error => this.errorMessage = <any>error);
  }

}
