import { Component, OnInit } from '@angular/core';

import { Tache } from '../tache';
import { Categorie } from '../categorie';

import { TacheService } from '../tache.service';
import { Observable, of, Subscription, interval } from 'rxjs';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  categories;
  taches;
  tachesEnCours;
  tachesSansCategorie;

  aboTache : Subscription[] = [];
  compteur : number[] = [];


  constructor(private service: TacheService) { }

  ngOnInit(): void {

  	  console.log("ind");
	  this.taches = this.service.getTaches();
	  // this.service.getTachesEnCours().subscribe(taches => this.tachesEnCours = taches);
	  // this.service.getTaches().subscribe(taches => this.taches = taches);
	  // this.service.getTachesFromCategorie(-1).subscribe(taches => this.tachesSansCategorie = taches);
	  
	  this.categories = this.service.getCategories();
	  this.tachesSansCategorie = this.service.getTachesFromCategorie(-1);
	  this.tachesEnCours = this.service.getTachesEnCours();

	  //Abonnements :
	  this.taches.forEach( e => {
	  	this.aboTache.push(new Subscription);
	  	this.compteur.push(0);
	  });

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
  
  quickStart()
  {
	  
	let t:Tache = {id: this.service.getLastIdTache()+1, nom:"QuickStart", idCategorie:-1, heureDebut: this.service.getTimeNow(), duree:"", dateDebut: this.service.getDateNow()};
	this.tachesEnCours.push(t);
	this.tachesSansCategorie.push(t);
	this.service.addTache(t);
	this.taches.push(t);
	this.aboTache.push(new Subscription);
  	this.compteur.push(0);
	this.demarrerTache(t);
  }

  demarrerTache(tache:Tache) {

  	//if tache.estDemarree {
  	let indice = this.taches.indexOf(tache);
  	console.log("ind " + indice);
  	this.aboTache[indice] = interval(1000).subscribe((valeur : number) => {this.compteur[indice] = valeur});
  	console.log("compteur " + this.compteur[indice]);
  	this.taches[indice].duree = this.compteur[indice].toString();

  }
  
  stopTache(tacheId)
  {
	  let t = this.service.getTache(tacheId);
	  t.duree = this.service.getDuree(t.heureDebut);
  }
  
  
}
