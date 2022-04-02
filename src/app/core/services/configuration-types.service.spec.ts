import { TestBed } from '@angular/core/testing';

import { ConfigurationTypesService } from './configuration-types.service';

describe('ConfigurationTypesService', () => {
  let service: ConfigurationTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
