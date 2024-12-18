import { TestBed } from '@angular/core/testing';

import { TorneoDeportistaService } from './torneo-deportista.service';

describe('TorneoDeportistaService', () => {
  let service: TorneoDeportistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TorneoDeportistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
