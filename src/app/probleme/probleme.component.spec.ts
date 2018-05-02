import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeProblemeService } from './typeprobleme.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AngularFontAwesomeModule,HttpClientModule],
      declarations: [ProblemeComponent],
      providers:[TypeProblemeService]
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

  it('Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemeForm.get('prenomUtilisateur');
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  it('Zone PRÉNOM valide avec 3 caractères', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenomUtilisateur');
    zone.setValue('a'.repeat(3));
    errors = zone.errors || {};
    expect(errors['longueurValide']).toBeUndefined();
  });

  it('Zone PRÉNOM valide avec 50 caractères', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenomUtilisateur');
    zone.setValue('a'.repeat(50));
    errors = zone.errors || {};
    expect(errors['longueurValide']).toBeUndefined();
  });

  it('Zone SMS est désactivée si Ne pas notifier', () => {
    component.gestionNotifications('nePasNotifier');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone Courriel est désactivée si Ne pas notifier', () => {
    component.gestionNotifications('pasnotification');
    let zone = component.problemeForm.get('courrielGroup');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone Courriel est désactivée si SMS', () => {
    component.gestionNotifications('messageTexte');
    let zone = component.problemeForm.get('courrielGroup');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone SMS est désactivée si Courriel', () => {
    component.gestionNotifications('courriel');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone Courriel est activée si Courriel', () => {
    component.gestionNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('Zone SMS est activée si SMS', () => {
    component.gestionNotifications('messageTexte');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.gestionNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');
    expect(zone.valid).toBeFalsy();
  });

  it('Zone VALIDER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.gestionNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('');
    expect(zone.valid).toBeFalsy();
  });

  it('Zone ADRESSE COURRIEL est invalide avec un format non confirme', () => {
    component.gestionNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('[a-z0-9._%+-]+@[a-z0-9.-]+');
    expect(zone.valid).toBeFalsy();
  });

});
