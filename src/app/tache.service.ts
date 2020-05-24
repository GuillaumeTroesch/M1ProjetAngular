import { Injectable } from '@angular/core';

import { Tache } from './tache';
import { TACHES } from './mock-tache';
import { Categorie } from './categorie';
import { CATEGORIES } from './mock-categories';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor() { }

  getTaches(): Observable<Tache[]>  {
  	return of(TACHES);
  }

  getCategories(): Observable<Categorie[]> {
  	return of(CATEGORIES);
  }

//(**Temporaire**) ajouter une tache
  addTache(tache : Tache): void {
  	TACHES.push(tache);
  }
  addCategorie(categorie : Categorie): void {
  	CATEGORIES.push(categorie);
  }

}
