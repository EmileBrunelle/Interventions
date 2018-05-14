import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule } from '@angular/router';
import { AccueilComponent } from './Accueil/accueil.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { HttpClientModule } from '@angular/common/http';
import { TypeProblemeService } from './probleme/typeprobleme.service';
import { TypeProblemeData } from './probleme/typeprobleme-data';
import { ProblemeService } from './probleme/probleme.service';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ProblemeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,  //Si absent erreur ERROR Error: Uncaught (in promise): Error: StaticInjectorError(AppModule)[ProduitComponent -> FormBuilder]:
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule
  ],
  providers: [HttpClientModule, TypeProblemeService, ProblemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
