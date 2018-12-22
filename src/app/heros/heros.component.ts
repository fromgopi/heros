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

  getHeros(): void {
    this.heroService.getHeros().subscribe(heros => this.heros = heros);
  }
}
