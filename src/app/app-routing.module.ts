import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component' 
import { TacheDetailsComponent } from './tache-details/tache-details.component' 
import { CategorieDetailsComponent } from './categorie-details/categorie-details.component' 
import { ListeParJoursComponent } from './liste-par-jours/liste-par-jours.component' 


const routes: Routes = [
	{ path: '', redirectTo: '/accueil', pathMatch: 'full'},
	{ path: 'accueil', component: AccueilComponent },
	{ path: 'tache', component: TacheDetailsComponent },
	{ path: 'categorie', component: CategorieDetailsComponent },
	{ path: 'parJours', component: ListeParJoursComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
