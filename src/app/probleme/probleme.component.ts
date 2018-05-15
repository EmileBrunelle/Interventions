import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/caracteres-validator';
import { TypeProblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './typeprobleme';
import { emailMatcherValidator } from '../shared/emailMatcher-validator';
import { IProbleme } from './probleme';
import { ProblemeService } from './probleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typesProblemes: ITypeProbleme[];
  errorMessage: string;

  probleme: IProbleme;
  messageSauvegarde: string;

  constructor(private fb: FormBuilder, private problemes: TypeProblemeService, private problemeService: ProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenomUtilisateur: ['', [VerifierCaracteresValidator.sansEspaces(), VerifierCaracteresValidator.longueurMinimum(3)]],
      nomUtilisateur: ['', [VerifierCaracteresValidator.sansEspaces(), VerifierCaracteresValidator.longueurMinimum(3)]],
      noProbleme: ['', Validators.required],
      notification: ['pasnotification'],

      courrielGroup: this.fb.group({
        courriel: [{ value: null, disabled: true }],
        courrielConfirmation: [{ value: null, disabled: true }],
      }),
      
      telephone: [{ value: null, disabled: true }],
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite:'',
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

  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
      this.probleme = this.problemeForm.value;
      // Affecter les valeurs qui proviennent du fg le plus interne.
      this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
      this.probleme.courrielConfirmation = this.problemeForm.get('courrielGroup.courrielConfirmation').value;
      this.probleme.DateProbleme = new Date();
      this.problemeService.saveProbleme(this.probleme)
        .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
          () => this.onSaveComplete(),  // Fonction callback
          (error: any) => this.errorMessage = <any>error
        );
    }
  }

  onSaveComplete(): void {
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.messageSauvegarde = 'Votre demande a bien été sauvegardée. Nous vous remercions.';
    this.ngOnInit();
  }
}
