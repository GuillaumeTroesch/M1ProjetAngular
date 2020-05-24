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
	edit: bool;
  tache: Tache;
  categories: Categorie[];

  constructor(private service: TacheService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  	this.getTache();
  	this.service.getCategories().subscribe(categories => this.categories = categories);
  }
  
  add(nomTache: string, catId: number): void {
    nomTache = nomTache.trim();
    if (!nomTache) { return; }
	let t:Tache = {id:4, nom:nomTache, idCategorie:catId, heureDebut: this.service.getTimeNow(), duree:"", dateDebut: this.service.getDateNow()};
    this.service.addTache(t);
	this.router.navigateByUrl('/accueil');
  }
  
  getTache(): void {
    const id = this.route.snapshot.paramMap.get('id');
	this.edit = id!=null;
	if (this.edit)
		this.service.getTache(id).subscribe(tache => this.tache = tache);
  }

}
