import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/caracteres-validator';
import { TypeProblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './typeprobleme';
import { emailMatcherValidator } from '../shared/emailMatcher-validator';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typesProblemes: ITypeProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private problemes: TypeProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenomUtilisateur: ['', [VerifierCaracteresValidator.sansEspaces(), VerifierCaracteresValidator.longueurMinimum(3)]],
      nomUtilisateur: ['', [VerifierCaracteresValidator.sansEspaces(), VerifierCaracteresValidator.longueurMinimum(3)]],
      noProbleme: ['', Validators.required],
      notification: ['pasnotification'],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }],
      }),
      telephone: [{ value: '', disabled: true }],
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite: '',
      dateProbleme: { value: Date(), disabled: true }
    });

    this.problemes.obtenirTypesProbleme()
      .subscribe(probleme => this.typesProblemes = probleme,
        error => this.errorMessage = <any>error);

    this.problemeForm.get('notification').valueChanges.subscribe(value => this.gestionNotifications(value));
  }

  gestionNotifications(typeNotification: string): void {

    const courrielGroupProblemeControl = this.problemeForm.get('courrielGroup');
    const courrielProblemeControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationProblemeControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const telephoneProblemeControl = this.problemeForm.get('telephone');

    courrielProblemeControl.clearValidators();
    courrielProblemeControl.reset();
    courrielProblemeControl.disable();

    courrielConfirmationProblemeControl.clearValidators();
    courrielConfirmationProblemeControl.reset();
    courrielConfirmationProblemeControl.disable();

    telephoneProblemeControl.clearValidators();
    telephoneProblemeControl.reset();
    telephoneProblemeControl.disable();

    courrielGroupProblemeControl.clearValidators();

    if (typeNotification === 'NotifierCourriel') {
      courrielProblemeControl.enable();
      courrielProblemeControl.setValidators([Validators.required, Validators.email]);
      courrielConfirmationProblemeControl.enable();
      courrielConfirmationProblemeControl.setValidators([Validators.required, Validators.email]);
      courrielGroupProblemeControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);

    } else if (typeNotification === 'NotifierTelephone') {
      telephoneProblemeControl.enable();
      telephoneProblemeControl.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(10), Validators.minLength(10)]);
    }

    courrielProblemeControl.updateValueAndValidity();
    telephoneProblemeControl.updateValueAndValidity();
    courrielConfirmationProblemeControl.updateValueAndValidity();
    courrielGroupProblemeControl.updateValueAndValidity();
  }
}
