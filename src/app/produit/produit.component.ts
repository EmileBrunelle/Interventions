import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'Inter-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produitForm: FormGroup;
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.produitForm = this.fb.group({
      nomProduit: ['',[Validators.minLength(5)]]
    });
  }

}
