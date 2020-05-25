import { Component, OnInit } from '@angular/core';

import { Tache } from '../tache';
import { Categorie } from '../categorie';

import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TacheService } from '../tache.service';

@Component({
  selector: 'app-liste-par-jours',
  templateUrl: './liste-par-jours.component.html',
  styleUrls: ['./liste-par-jours.component.css']
})
export class ListeParJoursComponent implements OnInit {
	today: string;
	taches: Tache[];
	tachesSansCategorie: Tache[];
	categories: Categorie[];
	lastDay: boolean;

	constructor(private service: TacheService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.today = this.route.snapshot.paramMap.get('date');
		if (this.today==null) this.today=this.service.getDateNow();
		this.categories = this.service.getCategories();
		this.init();
	}
	
	init(): void{
		if (this.today>this.service.getDateNow())
			this.today = this.service.getDateNow();
		this.lastDay = this.today==this.service.getDateNow();
		this.taches = this.service.getTachesJour(this.today);	
		this.tachesSansCategorie=[];
		this.taches.forEach(t => {
			if (t.idCategorie==-1)
				this.tachesSansCategorie.push(t);
		});
	}
	
	
	gotoPrev(){
		this.today = this.addDays(this.today, -1);
		this.init();
	}
	
	gotoNext() {
		this.today = this.addDays(this.today, 1);
		this.init();
	}
	
	gotoDate() {
		//If invalide date, automaticaly send to today
		this.init();
	}
	
	addDays(date, days) {
	  var result = new Date(date);
	  result.setDate(result.getDate() + days);
	  return result.toISOString().slice(0,10);;
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
 
	stopTache(tacheId)
	{
		let t = this.service.getTache(tacheId);
		t.duree = this.service.getDuree(t.heureDebut);
	}
  
	getDuree(heureDebut)
	{ return this.service.getDuree(heureDebut); }

	supprTache(idTache:number)
	{ this.service.removeTache(idTache); this.init(); }
	

}
