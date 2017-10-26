import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../classes/pokemon';
/*
 * Affiche la couleur correspondant au type du pokémon.
 * Prend en argument le type du pokémon.
 * Exemple d'utilisation:
 *   {{ pokemon.type | pokemonTypeColor }}
 */
@Pipe({name: 'pokemonTypeColor'})
export class PokemonTypeColorPipePipe implements PipeTransform {
  transform(type: string): string {
    let color: string;
    switch (type) {
      case 'Feu':
        color = 'warn';
        break;
      case 'Eau':
        color = 'primary';
        break;
      case 'Plante':
        color = 'accent';
        break;
      case 'Insecte':
        color = 'warn';
        break;
      case 'Normal':
        color = 'primary';
        break;
      case 'Vol':
        color = 'warn';
        break;
      case 'Poison':
        color = 'accent';
        break;
      case 'Fée':
        color = 'primary';
        break;
      case 'Psy':
        color = 'accent';
        break;
      case 'Electrik':
        color = 'warn';
        break;
      case 'Combat':
        color = 'accent';
        break;
      default:
        color = 'primary';
        break;
    }
    return color;
  }
}
