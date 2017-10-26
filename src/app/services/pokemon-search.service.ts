import { Injectable }  from '@angular/core';
import { Http } from '@angular/http';
import { Pokemon }  from '../classes/pokemon';
import '../rxjs-extension.ts';

@Injectable()
export class PokemonSearchService {

  constructor(private http: Http) {}

  searchName(term: string):  Promise<Pokemon[]> {
    return this.http.get(`app/pokemons/?name=${term}`)
      .toPromise()
      .then(response => response.json() as Pokemon[])
      .catch(this.handleError);
  }
  searchType(term: string):  Promise<Pokemon[]> {
    return this.http.get(`app/pokemons/?types=${term}`)
      .toPromise()
      .then(response => response.json() as Pokemon[])
      .catch(this.handleError);
  }
  // searchType(term: string): Observable<Pokemon[]> {
  //   return this.http
  //     .get(`app/pokemons/?types=${term}`)
  //     .map((r: Response) => r.json().data as Pokemon[]);
  // }
  private handleError(error: any): Promise<any> {
    console.error('Erreur : ', error); // on affiche simplement le message de l'erreur dans la console...
    return Promise.reject(error.message || error);
  }
}
