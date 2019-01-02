import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROS} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private heroesUrl = 'api/heros';

  /**
   * This function will get all the heroes from the db.
   * This is GET option.
   */

  getHeros(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heros => this.log('fetched Heroes')),
        catchError(this.handleError('getHeros', []))
      );
  }

  /**
   * This func will take hero id as input and returns the details of the hero.
   */
  getHero(heroId: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${heroId}`;
    return this.http.get<Hero[]>(url).pipe(
      tap(_ => this.log(`fetched hero id=${heroId}`)),
      catchError(this.handleError<Hero>(`getHero id=${heroId}`))
    );
  }

  /**
   * This function updates the hero name.
   * Parameter:- hero
   * This is PUT Option.
   */
  updateHero(hero: Hero): Observable<any> {
    console.log(hero);
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`Updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }


  addHero(hero: Hero): Observable<any> {
    return this.http.post(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((h: Hero) => this.log(`added hero w/ id=${h.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url =  `${this.heroesUrl}/${id}`;
    console.log(`The url for deleting any hero is ${url}`);
    return this.http.delete<Hero>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  private log(message: String) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
