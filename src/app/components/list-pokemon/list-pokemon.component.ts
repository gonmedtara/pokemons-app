import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Pokemon} from '../../classes/pokemon';
import {PokemonsService} from '../../services/pokemons.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.css'],
  animations: [
    trigger('deleteState', [
      state('inactive', style({
        transform: 'scale(0.9)'
      })),
      state('deleted', style({
        transition: '200ms',
        opacity:0,
      })),
      state('active', style({
        // animation: 'shake 1.82s cubic-bezier(0, 1.15, 0, 1.12)  both',
        // transform: 'translate3d(0, 0, 0)',
        // backfaceVisibility: 'hidden',
        // perspective: '1000px',
        // animationIterationCount: 'infinite',
        animationName: 'shake',
        animationDuration: '2s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
      transition('active => deleted', animate('100ms ease-out'))
    ]),
    trigger('deleteSpan', [
      state('inactive', style({
        height: '0px',
        opacity:'0',
        width: '100%',
        backgroundColor: '#f44437',
        color: '#fff',
        fontSize: 'larger',
        textAlign: 'center',
        lineHeight: '60px',
        transition :'1s'
      })),
      state('active', style({
        height: '60px',
        width: '100%',
        backgroundColor: '#f44437',
        color: '#fff',
        fontSize: 'larger',
        textAlign: 'center',
        lineHeight: '60px',
        transition :'1s'
      })),
      transition('inactive => active', animate('1s')),
      transition('active => inactive', animate('1s'))
    ])
  ]
})
export class ListPokemonComponent implements OnInit {

  private readyToDelete:boolean = false;
  public readyToDeleteState:string = 'inactive';
  public spanToDeleteState:string = 'inactive';
  pokemons:Pokemon[] = null;

  constructor(private router:Router, private pokemonsService:PokemonsService) {
  }

  ngOnInit():void {
    this.getPokemons();
  }

  getPokemons():void {
    this.pokemonsService.getPokemons().then(pokemons => this.pokemons = pokemons);
  }

  selectPokemon(pokemon:Pokemon):void {
    let link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

  updatePokemons(pokemons:Pokemon[]) {
    this.pokemons = pokemons;
  }

  showDeletePokemons(toggle:boolean) {
    this.readyToDelete = toggle;
    this.readyToDeleteState = this.readyToDeleteState === 'active' ? 'inactive' : (this.readyToDeleteState.split('/')[0] === 'deleted' ?'inactive':'active');
    this.spanToDeleteState = this.spanToDeleteState === 'active' ? 'inactive' : 'active';
    console.log("reasdy ",this.readyToDeleteState);
  }

  deletePokemon(pokemonId:number) {
    this.pokemonsService.deletePokemon(pokemonId);
    this.readyToDeleteState = 'deleted'.concat('/').concat(pokemonId.toString());
    this.getPokemons();
  }
}
