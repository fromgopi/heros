import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HEROS} from '../mock-heroes';


@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  constructor() { }
  heros = HEROS;


  selectedHero: Hero;

  ngOnInit() {
  }
  onSelect(hero: Hero): void {
    this.selectedHero =  hero;
    console.log('Selected Hero -> ' + this.selectedHero.name);
  }
}
