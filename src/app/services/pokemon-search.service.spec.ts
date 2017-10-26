import { TestBed, inject } from '@angular/core/testing';

import { PokemonSearchService } from './pokemon-search.service';

describe('PokemonSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonSearchService]
    });
  });

  it('should be created', inject([PokemonSearchService], (service: PokemonSearchService) => {
    expect(service).toBeTruthy();
  }));
});
