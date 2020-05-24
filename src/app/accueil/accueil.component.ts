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
	  this.service.getTachesEnCours().subscribe(taches => this.tachesEnCours = taches);
	  this.service.getTaches().subscribe(taches => this.taches = taches);
	  this.service.getTachesFromCategorie(-1).subscribe(taches => this.tachesSansCategorie = taches);
	  
	  this.service.getCategories().subscribe(categories => this.categories = categories);
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
	let t:Tache = {id:4, nom:"QuickStart", idCategorie:-1, heureDebut: this.service.getTimeNow(), duree:"", dateDebut: this.service.getDateNow()};
	this.service.addTache(t);
  }
  
  stopTache(tacheId:string)
  {
	  let t;
	  this.service.getTache(tacheId).subscribe(tache => t = tache);
	  t.duree = this.service.getDuree(t.heureDebut);
  }
  
  
}
