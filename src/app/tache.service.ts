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

  getTaches(): Tache[]  {
  	return (TACHES);
  }
  
  getTache(id:number) : Tache {
	  let res: Tache;
	  TACHES.forEach(t => {
		  if (t.id==id)
		  { res = t; return;} //return <=> break ici
	  });
	  return (res); 
  }
  
  getTachesFromCategorie(idCategorie: number): Tache[]  {
	  let res = [];
	  TACHES.forEach(t => {
		  if (t.idCategorie==idCategorie)
			  res.push(t);
	  });
	  return (res);
  }
  
  getTachesEnCours() : Tache[] {
	  let res = [];
	  TACHES.forEach(t => {
		  if (t.duree=="")
			  res.push(t);
	  });
	  return (res);
  }
  

  getCategories(): Categorie[] {
  	return (CATEGORIES);
  }
  
  addTache(tache : Tache): void {
  	TACHES.push(tache);
  }
  addCategorie(categorie : Categorie): void {
  	CATEGORIES.push(categorie);
  }
  
  
  getDateNow(){ return new Date().toISOString().slice(0,10); }
  getTimeNow(){ return new Date().getHours() + ":"+ new Date().getMinutes()+":"+new Date().getSeconds(); }
  getDuree(tempsDebut: string) {
	  let d = new Date();
	  let h = this.mod(parseInt(d.getHours())-parseInt(tempsDebut.split(":")[0]),24); 
	  let m = this.mod(parseInt(d.getMinutes())-parseInt(tempsDebut.split(":")[1]), 60);
	  let s = this.mod(parseInt(d.getSeconds())-parseInt(tempsDebut.split(":")[2]), 60);
	  return h+":"+m+":"+s;
  }
  mod(n, m) { return ((n % m) + m) % m; }
}
