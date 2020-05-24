import { Component, OnInit } from '@angular/core';

import { Categorie } from '../categorie';

import { TacheService } from '../tache.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categorie-details',
  templateUrl: './categorie-details.component.html',
  styleUrls: ['./categorie-details.component.css']
})
export class CategorieDetailsComponent implements OnInit {

  constructor(private service: TacheService, private router: Router) {  }

  ngOnInit(): void {
  }
  
  add(nomCategorie: string): void {
    nomCategorie = nomCategorie.trim();
    if (!nomCategorie) { return; }
	let c:Categorie = {id:4, nom:nomCategorie};
    this.service.addCategorie(c);
	this.router.navigateByUrl('/accueil');
  }

}
