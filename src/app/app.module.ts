import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TacheDetailsComponent } from './tache-details/tache-details.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ListeParJoursComponent } from './liste-par-jours/liste-par-jours.component';
import { CategorieDetailsComponent } from './categorie-details/categorie-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TacheDetailsComponent,
    AccueilComponent,
    ListeParJoursComponent,
    CategorieDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
