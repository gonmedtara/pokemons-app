import { TestBed, inject } from '@angular/core/testing';

import { NetworkCheckStatusService } from './network-check-status.service';

describe('NetworkCheckStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkCheckStatusService]
    });
  });

  it('should be created', inject([NetworkCheckStatusService], (service: NetworkCheckStatusService) => {
    expect(service).toBeTruthy();
  }));
});
