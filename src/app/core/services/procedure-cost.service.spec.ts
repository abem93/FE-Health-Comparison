import { TestBed } from '@angular/core/testing';

import { ProcedureCostService } from './procedure-cost.service';

describe('ProcedureCostService', () => {
  let service: ProcedureCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcedureCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
