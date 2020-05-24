import { Component, OnInit } from '@angular/core';

import { Tache } from '../tache';
import { Categorie } from '../categorie';

import { TacheService } from '../tache.service';


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

  constructor(private service: TacheService) { }

	ngOnInit(): void {
		this.taches = this.service.getTaches();	  
		this.categories = this.service.getCategories();
		this.init();
	}
  
  init(): void{
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
	let t:Tache = {id: this.service.getLastIdTache()+1, nom:"QuickStart", idCategorie:-1, heureDebut: this.service.getTimeNow(), duree:"", dateDebut: this.service.getDateNow()};
	this.tachesEnCours.push(t);
	this.tachesSansCategorie.push(t);
	this.service.addTache(t);
  }
  
  stopTache(tacheId)
  {
	  let t = this.service.getTache(tacheId);
	  t.duree = this.service.getDuree(t.heureDebut);
	  this.tachesEnCours = this.service.getTachesEnCours();
  }
  
  getDuree(heureDebut)
  { return this.service.getDuree(heureDebut); }
  
  supprTache(idTache:number)
  { this.service.removeTache(idTache); this.init(); }
}
