import { TestBed, inject } from '@angular/core/testing';

import { CacheStorageService } from './cache-storage.service';

describe('CacheStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheStorageService]
    });
  });

  it('should be created', inject([CacheStorageService], (service: CacheStorageService) => {
    expect(service).toBeTruthy();
  }));
});
