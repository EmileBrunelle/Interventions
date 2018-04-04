import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './Accueil/accueil.component';
import { ProduitComponent } from './produit/produit.component';

const routes: Routes = [
  { path:'accueil', component:AccueilComponent},
  { path:'produit', component:ProduitComponent},
  { path:'', redirectTo:'accueil', pathMatch:'full'},
  { path:'**', redirectTo:'accueil', pathMatch:'full'} // Si la route est inexistante, rediriger l'utilisateur sur bienvenue
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }