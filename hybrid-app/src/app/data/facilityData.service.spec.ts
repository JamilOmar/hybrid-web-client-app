import { TestBed } from '@angular/core/testing';

import { FacilityDataService } from './facilityData.service';

describe('FacilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacilityDataService = TestBed.get(FacilityDataService);
    expect(service).toBeTruthy();
  });
});
