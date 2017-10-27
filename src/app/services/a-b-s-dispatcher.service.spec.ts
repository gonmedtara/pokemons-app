import { TestBed, inject } from '@angular/core/testing';

import { ABSDispatcherService } from './a-b-s-dispatcher.service';

describe('ABSDispatcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ABSDispatcherService]
    });
  });

  it('should be created', inject([ABSDispatcherService], (service: ABSDispatcherService) => {
    expect(service).toBeTruthy();
  }));
});
