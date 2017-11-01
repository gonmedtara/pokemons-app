import { TestBed, inject } from '@angular/core/testing';

import { ABSFileStoreService } from './a-b-s-file-store.service';

describe('ABSFileStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABSFileStoreService]
    });
  });

  it('should be created', inject([ABSFileStoreService], (service: ABSFileStoreService) => {
    expect(service).toBeTruthy();
  }));
});
