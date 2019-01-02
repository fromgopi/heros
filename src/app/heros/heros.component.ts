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

  /**
   * Params: Name of the Hero
   * This func will add hero name with id.
   */

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero)
      .subscribe(
        hero => { this.heros.push(hero); }
      );
  }

  delete(hero: Hero): void {
    this.heros = this.heros.filter(h => h !== hero);
    console.log(`Details of the hero that will be deleted.... ${hero.name}`);
    this.heroService.deleteHero(hero).subscribe();
  }

}
