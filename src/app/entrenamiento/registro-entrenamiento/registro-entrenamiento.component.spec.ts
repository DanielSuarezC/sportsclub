import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEntrenamientoComponent } from './registro-entrenamiento.component';

describe('RegistroEntrenamientoComponent', () => {
  let component: RegistroEntrenamientoComponent;
  let fixture: ComponentFixture<RegistroEntrenamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroEntrenamientoComponent]
    });
    fixture = TestBed.createComponent(RegistroEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
