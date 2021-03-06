import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import '../../rxjs-extension.ts';
import {Pokemon} from '../../classes/pokemon';


@Component({
  selector: 'app-pokemon-filter',
  templateUrl: './pokemon-filter.component.html',
  styleUrls: ['./pokemon-filter.component.css']
})
export class PokemonFilterComponent implements OnInit {
  types:Array<string>; // types possibles d'un pokémon : 'Eau', 'Feu', etc ...
  public filtredPok :Pokemon [];
  @Input() pokemons :Pokemon[];
  @Output() private filtredPokemons : EventEmitter<Pokemon[]> = new EventEmitter();

  constructor(private pokemonsService: PokemonsService) { }
  ngOnInit() {
    this.types = this.pokemonsService.getPokemonTypes();
  }
  searchPokemonByType(searchValue : string){
    this.pokemonsService.searchType(searchValue)
      .then(pokemons => {this.filtredPok = pokemons;
        this.filtredPokemons.emit(this.filtredPok);});

  }
  getAllType() {
    this.pokemonsService.getPokemons()
      .then(pokemons => {
        this.filtredPok = pokemons;
        this.filtredPokemons.emit(this.filtredPok);
      });
  }
}
