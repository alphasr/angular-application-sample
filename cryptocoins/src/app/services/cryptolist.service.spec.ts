import { TestBed } from '@angular/core/testing';

import { CryptolistService } from './cryptolist.service';

describe('CryptolistService', () => {
  let service: CryptolistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptolistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
