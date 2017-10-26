import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Pokemon} from '../../classes/pokemon';
import { PokemonsService } from '../../services/pokemons.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.css']
})
export class DetailPokemonComponent implements OnInit {

  pokemon:Pokemon = null; // pokémon à afficher dans le template

  constructor(private route:ActivatedRoute, private pokemonsService: PokemonsService) {
  }

  // on injecte 'route' pour récupérer les paramètres de l'url, et 'router' pour rediriger l'utilisateur.

  ngOnInit():void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.pokemonsService.getPokemon(id).then(pokemon => this.pokemon = pokemon);
    });
  }


}
