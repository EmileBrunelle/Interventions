import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('champ nom du produit doit comporter au moins 5 caractères', () => {
    let zone = component.produitForm.controls['nomProduit'];
    zone.setValue('a'.repeat(5));
    expect(true).toBeTruthy();
  })

  it('nom du produit invalide avec 2 caractères ', () => {
    let errors = {};
    let zone = component.produitForm.get('nomProduit');
    zone.setValue('a'.repeat(2));
    errors = zone.errors || {};
    expect(errors['minLenght']).toBeTruthy();
  });
});
