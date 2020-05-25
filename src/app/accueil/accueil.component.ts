import { Component, OnInit } from '@angular/core';

import { Tache } from '../tache';
import { Categorie } from '../categorie';

import { TacheService } from '../tache.service';
import { Subscription, interval } from 'rxjs';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  categories: Categorie[];
  taches: Tache[];
  tachesEnCours: Tache[];
  tachesSansCategorie: Tache[];

  aboTache : Subscription[] = [];
  compteur : number[] = [];


  constructor(private service: TacheService) { }

  ngOnInit(): void {
	  this.taches = this.service.getTaches();
	  this.categories = this.service.getCategories();
	  this.tachesSansCategorie = this.service.getTachesFromCategorie(-1);
	  this.tachesEnCours = this.service.getTachesEnCours();
	}

  init(): void {
	  this.tachesSansCategorie = this.service.getTachesFromCategorie(-1);
	  this.tachesEnCours = this.service.getTachesEnCours();
  }
  
  getTachesFromCategorie(idCategorie)
  {
	  let res = []; 
	  this.taches.forEach(tache => {
		  if (tache.idCategorie==idCategorie)
			  res.push(tache)
	  });
	  return res;
  }
  
  getTempsTotalCategorie(idCategorie) : string
  {
	  let res = "00:00:00";
	  this.getTachesFromCategorie(idCategorie).forEach(t => {
		  res = this.service.sommeDuree(res, t.duree);
	  });
	  return res;
  }
  
  quickStart()
  {
  	let t:Tache = {id: this.service.getLastIdTache()+1, nom:"QuickStart", idCategorie:-1, enCours:true, heureDebut: this.service.getTimeNow(), duree:"00:00:00", dateDebut: this.service.getDateNow()};
  	
  	this.tachesSansCategorie.push(t);
  	this.service.addTache(t);

  	// this.taches.push(t); //this.taches se met à jour seul
    this.tachesEnCours.push(t);
  	this.demarrerTache(t);
  }

  demarrerTache(tache:Tache) {

  	let indice = this.tachesEnCours.indexOf(tache);
    let indice2 = this.taches.indexOf(tache);
  }
  
  stopTache(tache:Tache)
  {
	  this.service.stopTache(tache.id);
    tache.enCours = false;
    this.service.editTache(tache);
	this.init();
  }

  getDuree(heureDebut)
  { return this.service.getDuree(heureDebut); }
  
  supprTache(tache:Tache)
  { 
    this.taches = this.taches.filter(t => t !== tache);
    this.service.removeTache(tache.id); 
    this.init(); 
  }
}
