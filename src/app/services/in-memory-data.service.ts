import { InMemoryDbService } from 'angular-in-memory-web-api';
import { POKEMONS } from '../classes/mock-pokemons';
import { USERS } from '../classes/mock-users';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let pokemons = POKEMONS;
    let users = USERS;
    return {
       'pokemons': pokemons,
       'users': users };
  }
}
