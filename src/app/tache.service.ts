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
  
  getLastIdTache()
  {
	  let max = 0;
	  TACHES.forEach(t => {
		  if (t.id>max)
		   max = t.id;
	  });
	  return max;
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
		  if (t.enCours)
			  res.push(t);
	  });
	  return (res);
	}
	
	getTachesJour(date:string) : Tache[] {
		let res = [];
		TACHES.forEach(t => {
		  if (t.dateDebut==date)
			  res.push(t);
		});
		return (res);
	}
  
	editTache(tache : Tache): void {
		let t = this.getTache(tache.id);
		t.nom=tache.nom;
		t.idCategorie=tache.idCategorie;
		t.heureDebut=tache.heureDebut;
		t.duree=tache.duree;
		t.dateDebut=tache.dateDebut;
	}
	
	removeTache(idTache:number): void{
		for (let i=0; i < TACHES.length; i++)
		if (TACHES[i].id==idTache)
			{TACHES.splice(i, 1); return;}
	}
  

  getCategories(): Categorie[] {
  	return (CATEGORIES);
  }
  
  getLastIdCategorie()
  {
	  let max = 0;
	  CATEGORIES.forEach(c => {
		  if (c.id>max)
		   max = c.id;
	  });
	  return max;
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
	  let h = this.mod(d.getHours()-parseInt(tempsDebut.split(":")[0]),24); 
	  let m = this.mod(d.getMinutes()-parseInt(tempsDebut.split(":")[1]), 60);
	  let s = this.mod(d.getSeconds()-parseInt(tempsDebut.split(":")[2]), 60);
	  return (h<10?"0":"")+h+":"+(m<10?"0":"")+m+":"+(s<10?"0":"")+s;
  }

  getNextDuree(duree:string) : string {

  	let nextDuree;
  	let dureeSplit = duree.split(":");
  	let s = parseInt(dureeSplit[2]);
  	let m = parseInt(dureeSplit[1]);
  	let h = parseInt(dureeSplit[0]);
  	console.log("s : " + s + " m : " + m + " h : " + h);
  	if( (s + 1) % 60 == 0) {
  		s = 0;
  		if((m + 1) % 60 == 0) {
  			m = 0;
  			h = h + 1;
  		}
  		else 
  			m = m + 1;
  	}
  	else 
  		s = s + 1;
  	
  	return (h<10?"0":"")+h+":"+(m<10?"0":"")+m+":"+(s<10?"0":"")+s;

  }



  mod(n, m) { return ((n % m) + m) % m; }
  sommeDuree(d1:string, d2: string) : string {
	  if (d1=="") return d2;
	  if (d2=="") return d1;
	  let t1 = d1.split(":");
	  let t2 = d2.split(":");
	  let r = 0;
	  let s = parseInt(t1[2]) + parseInt(t2[2]);
	  if (s>60) {s-=60; r=1;}
	  let m = parseInt(t1[1]) + parseInt(t2[1]) + r;
	  if (m>60) {m-=60; r=1;} else r=0;
	  let h = parseInt(t1[0]) + parseInt(t2[0]) + r;
	  return (h<10?"0":"")+h+":"+(m<10?"0":"")+m+":"+(s<10?"0":"")+s;
  }
}