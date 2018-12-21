import { Component, OnInit } from '@angular/core';
import {HeroService} from '../hero.service';
import {Hero} from '../hero';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  constructor(private heroService: HeroService) { }

  selectedHero: Hero;
  heros: Hero[];

  ngOnInit() {
    this.getHeros();
  }
  onSelect(hero: Hero): void {
    this.selectedHero =  hero;
    console.log('Selected Hero -> ' + this.selectedHero.name);
  }

  getHeros(): void {
    this.heroService.getHeros().subscribe(heros => this.heros = heros);
  }
}
