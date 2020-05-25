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
  categories: Categorie[];
  taches: Tache[];
  tachesEnCours: Tache[];
  mapObserver: Map<number, Subscription>;
  mapCompteur: Map<number, string>;
  tachesSansCategorie: Tache[];

  aboTache : Subscription[] = [];
  compteur : number[] = [];


  constructor(private service: TacheService) { 
    this.mapObserver = new Map<number, Subscription>();
    this.mapCompteur = new Map<number, string>();
  }

  ngOnInit(): void {

	  this.taches = this.service.getTaches();
	  // this.service.getTachesEnCours().subscribe(taches => this.tachesEnCours = taches);
	  // this.service.getTaches().subscribe(taches => this.taches = taches);
	  // this.service.getTachesFromCategorie(-1).subscribe(taches => this.tachesSansCategorie = taches);
	  
	  this.categories = this.service.getCategories();
	  this.tachesSansCategorie = this.service.getTachesFromCategorie(-1);
	  this.tachesEnCours = this.service.getTachesEnCours();

	  //Abonnements :
	  /*this.tachesEnCours.forEach( tache => {
	  	this.mapObserver.set(tache.id, new Subscription);
      this.mapCompteur.set(tache.id, 0);  
      this.demarrerTache(tache);
	  });*/
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
  	this.mapObserver.set(t.id, new Subscription);
    console.log("quickStart" + t.id);
    this.mapCompteur.set(t.id, this.service.getNextDuree(t.duree));

  	this.tachesSansCategorie.push(t);
  	this.service.addTache(t);

  	this.taches.push(t);
    this.tachesEnCours.push(t);
    //this.compteur.push(0);
  	this.demarrerTache(t);
  }

  demarrerTache(tache:Tache) {

  	let indice = this.tachesEnCours.indexOf(tache);
    let indice2 = this.taches.indexOf(tache);
    //this.mapObserver.set(tache.id, interval(1000).subscribe((valeur : number) => {this.mapCompteur.set(tache.id, this.service.getNextDuree(tache.duree))}));
    this.mapObserver.set(tache.id, interval(1000).subscribe((valeur : number) => {
          this.taches[indice2].duree = this.service.getNextDuree(tache.duree)
        }));

    //this.mapObserver.set(tache.id, interval(1000).subscribe((valeur : number) => {this.mapCompteur.set(tache.id, valeur)}));
  	//this.tachesEnCours[indice].duree = this.mapCompteur.get(tache.id).toString();

  }
  
  afficherTemps(tache:Tache) : string {

    return tache.duree;
    //return this.mapCompteur.get(tache.id);
  }

  stopTacheEnCours(tache:Tache)
  {
    let indice = this.tachesEnCours.indexOf(tache);
    this.mapObserver.get(tache.id).unsubscribe();
    this.mapCompteur.set(tache.id, "0");
    tache.enCours = false;
    this.tachesEnCours = this.tachesEnCours.filter(t => t !== tache);
  
    this.service.editTache(tache);
	  //let t = this.service.getTache(tache);
	  //t.duree = this.service.getDuree(t.heureDebut);
	  //this.tachesEnCours = this.service.getTachesEnCours();
  }
  
  stopTache(tache:Tache)
  {
    this.mapObserver[tache.id].unsubscribe();
    tache.enCours = false;
    this.service.editTache(tache);
    //let t = this.service.getTache(tache);
    //t.duree = this.service.getDuree(t.heureDebut);
    //this.tachesEnCours = this.service.getTachesEnCours();
  }


  getDuree(heureDebut)
  { return this.service.getDuree(heureDebut); }
  
  supprTache(tache:Tache)
  { 
    this.taches = this.taches.filter(t => t !== tache);
    this.service.removeTache(tache.id); 
    //this.init(); 

  }
}
