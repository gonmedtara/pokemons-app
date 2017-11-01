import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PokemonsService} from '../../services/pokemons.service';
import {CacheStorageService} from '../../services/cache-storage.service';
import {Pokemon} from '../../classes/pokemon';


@Component({
  selector: 'app-pokemon-add',
  templateUrl: './pokemon-add.component.html',
  styleUrls: ['./pokemon-add.component.css']
})
export class PokemonAddComponent implements OnInit {
  private deletedToggle:boolean = false;
  @Output() private onDelete:EventEmitter<boolean> = new EventEmitter();

  constructor(public dialog:MatDialog) {
  }

  ngOnInit() {
  }

  showDeleted() {
    this.deletedToggle = !this.deletedToggle;
    this.onDelete.emit(this.deletedToggle);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.html',
  styleUrls: ['./dialog-content-example-dialog.css']
})
export class DialogContentExampleDialog {
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
              public  dialogRef:MatDialogRef<DialogContentExampleDialog>,
              private router:Router) {
  }

  ngOnInit() {
    this.types = this.pokemonsService.getPokemonTypes();
    this.pokemon = {
      "id": (new Date().valueOf()) * 10000,
      "name": "",
      "hp": 0,
      "cp": 0,
      "picture": "http://static.pokemonpets.com/images/monsters-images-800-800/4221-Unown-U.png",
      "types": [],
      "created": new Date()
    };
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
    console.log("picture",this.pokemon);
    this.pokemonsService.addPokemons(this.pokemon);
    this.closeDialog();
    let link = ['/pokemon', this.pokemon.id];
    this.router.navigate(link);
  }

  updatePicture(imgOriginalOut:string, pokemonId:any) {
    this.pokemon.picture = imgOriginalOut;
  }
  closeDialog(){
    this.dialogRef.close();
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
