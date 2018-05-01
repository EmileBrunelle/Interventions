import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeProblemeService } from './typeprobleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
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
    let zone = component.problemeForm.controls['prenomUtilisateur'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  it('Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenomUtilisateur'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
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
    let zone = component.problemeForm.get('courriel');
    zone.setValue('');
    expect(zone.valid).toBeFalsy();
  });

});
