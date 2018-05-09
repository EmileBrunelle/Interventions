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
    expect(errors['chaine']).toBeUndefined();
  });

  it('Zone PRÉNOM valide avec 50 caractères', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenomUtilisateur');
    zone.setValue('a'.repeat(50));
    errors = zone.errors || {};
    expect(errors['chaine']).toBeUndefined();
  });

  it('Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.gestionNotifications('courriel');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone Courriel est désactivée si Ne pas notifier', () => {
    component.gestionNotifications('pasnotification');
    let zone = component.problemeForm.get('courrielGroup');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone Courriel est activée si Courriel', () => {
    component.gestionNotifications('NotifierCourriel');
    let zone = component.problemeForm.get('courrielGroup');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('Zone SMS est activée si SMS', () => {
    component.gestionNotifications('NotifierTelephone');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.gestionNotifications('NotifierCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');
    expect(zone.valid).toBeFalsy();
  });

  it('Zone VALIDER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.gestionNotifications('NotifierCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('');
    expect(zone.valid).toBeFalsy();
  });

  it('Zone ADRESSE COURRIEL est invalide avec un format non confirme', () => {
    component.gestionNotifications('NotifierCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('[a-z0-9._%+-]+@[a-z0-9.-]+');
    expect(zone.valid).toBeFalsy();
  });

  it('Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.gestionNotifications('NotifierCourriel');
    let errors = {};
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneValidation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('');
    zoneValidation.setValue('bagels@bagels.com');
    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielConfirmation']).toBeUndefined();
  });

  it('Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.gestionNotifications('NotifierCourriel');
    let errors = {};
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneValidation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('bagels@bagels.com');
    zoneValidation.setValue('');
    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielConfirmation']).toBeUndefined();
  });

  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.gestionNotifications('NotifierCourriel');
    let errors = {};
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneValidation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('bagels@bagels.com');
    zoneValidation.setValue('pasbagels@pasbagels.com');
    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielConfirmation']).toBe(true);
  });

  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.gestionNotifications('NotifierCourriel');
    let errors = {};
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneValidation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('bagels@bagels.com');
    zoneValidation.setValue('bagels@bagels.com');
    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielConfirmation']).toBeUndefined();
  });

  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.gestionNotifications('NotifierCourriel');
    let errors = {};
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneValidation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('bagels@bagels.com');
    zoneValidation.setValue('bagels@bagels.com');
    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielConfirmation']).toBeUndefined();
  });

  it('Zone TELEPHONE est désactivée si Ne pas notifier', () => {
    component.gestionNotifications('pasNotification');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.gestionNotifications('NotifierTelephone');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.gestionNotifications('NotifierTelephone');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte ', () => {
    component.gestionNotifications('NotifierTelephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('');
    expect(zone.valid).toBeFalsy();
  });

  it('Zone TELEPHONE est invalide avec un format non confirme quand notifier par messagerie texte', () => {
    component.gestionNotifications('NotifierTelephone');
    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('abc');
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.gestionNotifications('NotifierTelephone');
    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('9'.repeat(9));
    errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.gestionNotifications('NotifierTelephone');
    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('1'.repeat(11));
    errors = zone.errors || {};
    expect(errors['maxlength']).toBeTruthy();
  });

  it('Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.gestionNotifications('NotifierTelephone');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('1'.repeat(10));
    expect(zone.valid).toBeTruthy();
  });

});