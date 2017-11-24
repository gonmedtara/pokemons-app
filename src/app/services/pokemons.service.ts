import {Injectable} from '@angular/core';
import {ABSDispatcherService} from './a-b-s-dispatcher.service';
// import 'rxjs/add/operator/toPromise';
import {Pokemon} from '../classes/pokemon';

@Injectable()
export class PokemonsService {
  constructor(private aBSDispatcherService:ABSDispatcherService) {
    this.aBSDispatcherService.init("pokemon", "app/pokemons");
  }

  getPokemons() {
    return this.aBSDispatcherService.getAll();
  }

  // Retourne le pokémon avec l'identifiant passé en paramètre
  getPokemon(id:number) {
    return this.aBSDispatcherService.getById(id).then(el =>el);
  }

  addPokemons(pokemon:Pokemon):any {
    return this.aBSDispatcherService.add(pokemon);
  }

  update(pokemon:Pokemon) {
    return this.aBSDispatcherService.put(pokemon).then(reponse => this.aBSDispatcherService.getById(pokemon.id))
  }

  deletePokemon(pokemonId:number) {
    return this.aBSDispatcherService.delete(pokemonId).then((el)=> console.log("Delete", el));
  }

  // types de pokémons possible
  getPokemonTypes():Array<string> {
    return [
      'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
      'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
    ];
  }

  searchName(term:string) {
    return this.aBSDispatcherService.getAll().then((data) => {
      console.table(data);

      var pokemons = data.map(function(pokemon){
        if(pokemon.name.toUpperCase().indexOf(term.toUpperCase())> -1){
          return pokemon;
        }
      });
      return pokemons ;
    })
  }

  searchType(term:string) {
    return this.aBSDispatcherService.getAll().then((data) => {
      var pokemons = [];
       data.map(function(pokemon){
        if(pokemon.types.indexOf(term)> -1){
          pokemons.push(pokemon);
        }
      });
      return pokemons ;
    })
  }

}
