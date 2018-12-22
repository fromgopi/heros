import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROS} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeros(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched Heroes');
    this.messageService.add('Heroes: Hi Man you are the hero for this show!.');
    return of(HEROS);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: Fetched hero id=${id}`);
    console.log(HEROS)
    return of(HEROS.find(hero => hero.id === id));
  }
}
