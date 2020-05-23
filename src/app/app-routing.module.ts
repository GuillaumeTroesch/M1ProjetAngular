import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component' 
import { TacheDetailsComponent } from './tache-details/tache-details.component' 

const routes: Routes = [
	{ path: 'accueil', component: AccueilComponent },
	{ path: 'tache', component: TacheDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
