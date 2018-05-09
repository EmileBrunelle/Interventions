import { AppPage } from './app.po';

describe('stock App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Déclarer un problème');
  });
  
  it('doit activer le bouton Sauvegarder avec champs valides scénario nominal', () => {
    page.setChampsValidesScenarioNominal();
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('doit activer le bouton Sauvegarder avec champs valides par messages textes', () => {
    page.setChampsValidesScenarioAlternatifParMessageTexte();
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('doit activer le bouton Sauvegarder avec champs valides par courriel', () => {
    page.setChampsValidesScenarioAlternatifParCourriel();
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('zone PRENOM UTILISATEUR a une bordure VERTE si nombre de caractères suffisant', () => {
    page.setZonePrenomUtilisateurCaracteresSuffisant();
    expect(page.obtenirClasseZonePrenomUtilisateur()).toContain('is-valid');
  });

  it('zone PRENOM UTILISATEUR a une bordure ROUGE si nombre de caractères insuffisant', () => {
    page.setZonePrenomUtilisateurCaracteresInsuffisant();
    expect(page.obtenirClasseZonePrenomUtilisateur()).toContain('is-invalid');
  });
});
