import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEntrenamientoComponent } from './detalles-entrenamiento.component';

describe('DetallesEntrenamientoComponent', () => {
  let component: DetallesEntrenamientoComponent;
  let fixture: ComponentFixture<DetallesEntrenamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesEntrenamientoComponent]
    });
    fixture = TestBed.createComponent(DetallesEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
