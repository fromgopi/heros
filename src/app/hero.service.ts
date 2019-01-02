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

  updateHero(hero: Hero): Observable<any> {
    console.log(hero)
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`Updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
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
