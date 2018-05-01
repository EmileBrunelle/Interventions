import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/caracteres-validator';
import { TypeProblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './typeprobleme';

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
      prenomUtilisateur: ['', [Validators.required, VerifierCaracteresValidator.longueurValide(3)]],
      nomUtilisateur: ['', [Validators.required, VerifierCaracteresValidator.longueurValide(3)]],
      noProbleme: [''],
      notifier:['Aucun'],
      notificationGroup: this.fb.group({
        modeNotification: [{value: ''}]
      })
    });

    this.problemes.obtenirTypesProbleme()
    .subscribe(probleme => this.typesProblemes = probleme,
              error => this.errorMessage = <any>error);              
  }

  gestionNotifications(typeNotification: string): void {
    const courrielControl = this.problemeForm.get('notificationGroup.mode');
    const courrielValideControl = this.problemeForm.get('notificationGroup.mode');
    const smsControl = this.problemeForm.get('notificationGroup.mode');

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    courrielValideControl.clearValidators();
    courrielValideControl.reset();
    courrielValideControl.disable();

    smsControl.clearValidators();
    smsControl.reset();
    smsControl.disable();

    if (typeNotification === 'ParCourriel') {
      courrielControl.enable();
      courrielControl.setValidators([Validators.required, Validators.email]);
    } else if (typeNotification === 'ParSMS') {
      smsControl.enable();
      smsControl.setValidators([Validators.required, Validators.pattern('[0-9]+'),Validators.maxLength(10),Validators.minLength(10)]);
    }
    courrielControl.updateValueAndValidity();
    courrielValideControl.updateValueAndValidity();
    smsControl.updateValueAndValidity();
  }
}
