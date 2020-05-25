import { Component, OnInit } from '@angular/core';

import { Tache } from '../tache';
import { Categorie } from '../categorie';
import { TacheService } from '../tache.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tache-details',
  templateUrl: './tache-details.component.html',
  styleUrls: ['./tache-details.component.css']
})

export class TacheDetailsComponent implements OnInit {

	edit1: boolean;
	edition:boolean;
	tache: Tache;
	categories: Categorie[];

	constructor(private service: TacheService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.initTache();
		this.categories = this.service.getCategories();
	}
  
	initTache(): void {
		const id = this.route.snapshot.paramMap.get('id');
		this.edition = id!=null;
		if (this.edition)
			this.tache = this.service.getTache(parseInt(id));
		else
			this.tache={id:this.service.getLastIdTache()+1, enCours:true, nom:null, idCategorie:0, heureDebut:"", duree:"", dateDebut:""};
	}
	  
	getTache(): void {
		const id = this.route.snapshot.paramMap.get('id');
		let idNum = parseInt(id);
		this.edit1 = id!=null;
		if (this.edit)
			this.tache = this.service.getTache(idNum);
	  }


	add(nomTache: string, catId: number): void {
		nomTache = nomTache.trim();
		if (!nomTache) { return; }
		let t:Tache = {id:this.service.getLastIdTache()+1, nom:nomTache, idCategorie:catId, enCours:true, heureDebut: this.service.getTimeNow(), duree:"00:00:00", dateDebut: this.service.getDateNow()};
		this.service.addTache(t);
		this.router.navigateByUrl('/accueil');
	}
  
	edit(nomTache: string, catId: number, heureDebut:string, duree: string, dateDebut:string): void {
		nomTache = nomTache.trim();
		if (!nomTache) { return; }
		this.service.editTache({id:this.tache.id, nom:nomTache, idCategorie:catId, enCours:true, heureDebut: heureDebut, duree:duree, dateDebut: dateDebut});
		this.router.navigateByUrl('/accueil');
	}
}