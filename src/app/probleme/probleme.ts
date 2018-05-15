export interface IProbleme {
    id: number,
    prenomUtilisateur: string,
    nomUtilisateur: string,
    noProbleme: number,
    notification: string,
    courriel?: string,
    courrielConfirmation?: string,
    telephone?: string,
    descriptionProbleme: string,
    noUnite?: string,
    DateProbleme: Date
}