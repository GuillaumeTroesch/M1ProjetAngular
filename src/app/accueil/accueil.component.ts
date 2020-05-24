import { Component, OnInit } from '@angular/core';
import { Tache } from '../tache';
import { TACHES } from '../mock-tache';
import { Categorie } from '../categorie';
import { CATEGORIES } from '../mock-categories';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  categories = CATEGORIES;
  taches = TACHES;
    tache: Tache = {
  	id:1,
  	nom: 'FaireLeProjet',
  	idCategorie:1,
  	dateDebut:"12/12/12;24:00"
  };

  constructor() { }

  ngOnInit(): void {
  }

}
