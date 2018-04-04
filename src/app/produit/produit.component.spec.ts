import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitComponent } from './produit.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProduitComponent', () => {
  let component: ProduitComponent;
  let fixture: ComponentFixture<ProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('champ nom du produit doit comporter au moins 5 caractères', () => {
    let zone = component.produitForm.controls['nomProduit'];
    zone.setValue('a'.repeat(5));
    expect(zone.valid).toBeTruthy();
  })
  it('nom du produit invalide avec 2 caractères ', () => {
    let errors = {};
    let zone = component.produitForm.get('nomProduit');
    zone.setValue('a'.repeat(2));
    errors = zone.errors || {};
    expect(errors['minlenght']).toBeFalsy();
  });
});
