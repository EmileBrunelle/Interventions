import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/probleme');
  }

  getParagraphText() {
    return element(by.css('Inter-root h5')).getText();
  }

  setChampsValidesScenarioNominal(): void {
    element(by.id('prenomUtilisateur')).clear();
    element(by.id('prenomUtilisateur')).sendKeys('Émile');
    element(by.id('nomUtilisateur')).clear();
    element(by.id('nomUtilisateur')).sendKeys('Brunelle');
    element(by.id('typeProblemeId')).all(by.tagName('option')).get(1).click();
    element.all(by.id('notificationId')).get(0).click();
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  setChampsValidesScenarioAlternatifParMessageTexte(): void {
    element(by.id('prenomUtilisateur')).clear();
    element(by.id('prenomUtilisateur')).sendKeys('Émile');
    element(by.id('nomUtilisateur')).clear();
    element(by.id('nomUtilisateur')).sendKeys('Brunelle');;
    element(by.id('typeProblemeId')).all(by.tagName('option')).get(1).click();
    element.all(by.id('notificationId')).get(2).click();
    element(by.id('telephoneId')).sendKeys('5141231234');
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  setChampsValidesScenarioAlternatifParCourriel(): void {
    element(by.id('prenomUtilisateur')).clear();
    element(by.id('prenomUtilisateur')).sendKeys('Émile');
    element(by.id('nomUtilisateur')).clear();
    element(by.id('nomUtilisateur')).sendKeys('Brunelle');;
    element(by.id('typeProblemeId')).all(by.tagName('option')).get(1).click();
    element.all(by.id('notificationId')).get(1).click();
    element(by.id('courriel')).sendKeys('aa@bbb.com');
    element(by.id('courrielConfirmation')).sendKeys('aa@bbb.com');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  boutonSubmit(): ElementFinder {
    return element(by.buttonText('Sauvegarder'));
  }

  setZonePrenomUtilisateurCaracteresInsuffisant(): void {
    element(by.id('prenomUtilisateur')).clear();
    element(by.id('prenomUtilisateur')).sendKeys('XX');
  }

  setZonePrenomUtilisateurCaracteresSuffisant(): void {
    element(by.id('prenomUtilisateur')).clear();
    element(by.id('prenomUtilisateur')).sendKeys('XXXXX');
  }

  obtenirClasseZonePrenomUtilisateur() {
    return element(by.id('prenomUtilisateur')).getAttribute("class");
  }
}
