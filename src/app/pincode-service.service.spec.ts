import { TestBed } from '@angular/core/testing';

import { PincodeService } from './pincode-service.service';

describe('PincodeServiceService', () => {
  let service: PincodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PincodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
