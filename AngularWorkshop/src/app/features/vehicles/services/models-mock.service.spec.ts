import { TestBed } from '@angular/core/testing';

import { ModelsMockService } from './models-mock.service';

describe('ModelsMockService', () => {
  let service: ModelsMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelsMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
