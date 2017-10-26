import { Component, OnInit } from '@angular/core';
import { PokemonSearchService } from '../../services/pokemon-search.service';
import { PokemonsService } from '../../services/pokemons.service';
import {FormControl} from '@angular/forms';
import '../../rxjs-extension.ts';
import {Pokemon} from '../../classes/pokemon';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {

  pokemons: Pokemon[] =  null;

  constructor( private pokemonSearchService: PokemonSearchService,
               private pokemonsService: PokemonsService) { }
  ngOnInit() {
    this.pokemonsService.getPokemons().then(pokemons => this.pokemons = pokemons);
  }
  myControl: FormControl = new FormControl();

  searchPokemonByName(searchValue : string){
    this.pokemonSearchService.searchName(searchValue)
      .then(pokemons => this.pokemons = pokemons);
  }
}
