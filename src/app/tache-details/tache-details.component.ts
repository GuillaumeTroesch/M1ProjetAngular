import { Component, OnInit } from '@angular/core';
import { Tache } from '../tache';
import { TACHES } from '../mock-tache';
import { Categorie } from '../categorie';
import { CATEGORIES } from '../mock-categories';
import { TacheService } from '../tache.service';


@Component({
  selector: 'app-tache-details',
  templateUrl: './tache-details.component.html',
  styleUrls: ['./tache-details.component.css']
})

export class TacheDetailsComponent implements OnInit {

  taches: Tache[];
  categories: Categorie[];

  tache: Tache = {
  	id:1,
  	nom: 'FaireLeProjet',
  	idCategorie:1,
  	dateDebut:"12/12/12;24:00"
  };

  constructor(private tacheService: TacheService) { }

  ngOnInit(): void {
  	this.getTaches();
  	this.getCaTegories();
  }

  getTaches(): void {
  	this.tacheService.getTaches()
      .subscribe(taches => this.taches = taches);
  }

    getCaTegories(): void {
  	this.tacheService.getTaches()
      .subscribe(categories => this.categories = categories);
  }

}
