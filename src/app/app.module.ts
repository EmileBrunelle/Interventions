import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BienvenueComponent } from './bienvenue/bienvenue.component';
import { RouterModule } from '@angular/router';
import { AccueilComponent } from './Accueil/accueil.component';
import { ProduitComponent } from './produit/produit.component';
import { ProblemeComponent } from './probleme/probleme.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenueComponent,
    AccueilComponent,
    ProduitComponent,
    ProblemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
