import { TestBed, inject } from '@angular/core/testing';

import { KickerboxService } from './kickerbox.service';

describe('KickerboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KickerboxService]
    });
  });

  it('should be created', inject([KickerboxService], (service: KickerboxService) => {
    expect(service).toBeTruthy();
  }));
});
