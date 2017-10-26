import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {PokemonsService} from '../../services/pokemons.service';
import {CacheStorageService} from '../../services/cache-storage.service';
import {Pokemon} from '../../classes/pokemon';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})

export class PokemonFormComponent implements OnInit {
  // @Input() pokemon: Pokemon; // propriété d'entrée du composant
  pokemon:Pokemon = null; // pokémon à afficher dans le template
  types:Array<string>; // types possibles d'un pokémon : 'Eau', 'Feu', etc ...
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4)]);
  hpFormControl = new FormControl('', [
    Validators.required]);
  cpFormControl = new FormControl('', [
    Validators.required]);

  constructor(private pokemonsService:PokemonsService,
              private cacheStorageService:CacheStorageService,
              private route:ActivatedRoute, // just for testing !
              private router:Router) {
  }

  ngOnInit() {
    // Initialisation de la propriété types
    this.route.params.forEach((params:Params) => {
      let id = +params['id'];
      this.pokemonsService.getPokemon(id).then(pokemon => this.pokemon = pokemon);
    });
    this.types = this.pokemonsService.getPokemonTypes();
  }

  // Détermine si le type passé en paramètres appartient ou non au pokémon en cours d'édition.
  hasType(type:string):boolean {
    let index = this.pokemon.types.indexOf(type);
    if (~index) return true;
    return false;
  }

  // valide le nombre de 1-3 types par pokémon
  isTypesValid(type:string):boolean {
    if (this.pokemon.types.length >= 3 && !this.hasType(type)) {
      return false;
    }
    return true;
  }

  hasNoTypes():boolean {
    if (this.pokemon.types.length <= 0) {
      return true;
    }
    return false;
  }

  // Méthode appelée lorsque l'utilisateur ajoute ou retire un type au pokémon en cours d'édition.
  selectType($event:any, type:string):void {
    let checked = $event.checked;
    if (checked) {
      this.pokemon.types.push(type);
    } else {
      let index = this.pokemon.types.indexOf(type);
      if (~index) {
        this.pokemon.types.splice(index, 1);
      }
    }
  }

  // La méthode appelée lorsque le formulaire est soumis.
  onSubmit():void {
    console.log("this pokemon", JSON.stringify(this.pokemon));
    this.pokemonsService.update(this.pokemon)
      .then(() => {
        let link = ['/pokemon', this.pokemon.id];
        this.router.navigate(link);
      });
  }

  updatePicture(imgOriginalOut:string, pokemonId:any) {
    let imageFromIxDB:string = this.pokemon.picture;
    this.cacheStorageService.saveImage(imgOriginalOut, this.pokemon.id);
    imageFromIxDB = this.cacheStorageService.getImage(this.pokemon.picture, this.pokemon.id);
    this.pokemon.picture = imageFromIxDB;
  }

  goBack():void {
    this.router.navigate(['/pokemons']);
  }

  getErrorName() {
    return this.nameFormControl.errors.required ? 'You must enter a value' :
      this.nameFormControl.errors.minlength ? 'Not a valid Name' :
        '';
  }

  getErrorHp() {
    return this.hpFormControl.errors.required ? 'You must enter a value' : '';
  }

  getErrorCp() {
    return this.cpFormControl.errors.required ? 'You must enter a value' : '';
  }

}
