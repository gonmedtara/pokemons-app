import { TestBed, inject } from '@angular/core/testing';

import { ABSSynchroniserService } from './a-b-s-synchroniser.service';

describe('ABSSynchroniserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABSSynchroniserService]
    });
  });

  it('should be created', inject([ABSSynchroniserService], (service: ABSSynchroniserService) => {
    expect(service).toBeTruthy();
  }));
});
