import { TestBed } from '@angular/core/testing';

import { DeportistaEntrenamientoService } from './deportista-entrenamiento.service';

describe('DeportistaEntrenamientoService', () => {
  let service: DeportistaEntrenamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeportistaEntrenamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
