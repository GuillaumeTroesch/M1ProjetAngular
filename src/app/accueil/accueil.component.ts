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
	  // this.service.getTachesEnCours().subscribe(taches => this.tachesEnCours = taches);
	  // this.service.getTaches().subscribe(taches => this.taches = taches);
	  // this.service.getTachesFromCategorie(-1).subscribe(taches => this.tachesSansCategorie = taches);
	  
	  this.categories = this.service.getCategories();
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
  
  quickStart()
  {
	let t:Tache = {id:4, nom:"QuickStart", idCategorie:-1, heureDebut: this.service.getTimeNow(), duree:"", dateDebut: this.service.getDateNow()};
	this.service.addTache(t);
  }
  
  stopTache(tacheId:string)
  {
	  let t = this.service.getTache(tacheId);
	  t.duree = this.service.getDuree(t.heureDebut);
  }
  
  
}
