import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component' 
import { TacheDetailsComponent } from './tache-details/tache-details.component' 
import { ListeParJoursComponent } from './liste-par-jours/liste-par-jours.component' 

const routes: Routes = [
	{ path: 'accueil', component: AccueilComponent },
	{ path: 'tache', component: TacheDetailsComponent },
	{ path: 'parJours', component: ListeParJoursComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
