import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEntrenamientoComponent } from './lista-entrenamiento.component';

describe('ListaEntrenamientoComponent', () => {
  let component: ListaEntrenamientoComponent;
  let fixture: ComponentFixture<ListaEntrenamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaEntrenamientoComponent]
    });
    fixture = TestBed.createComponent(ListaEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
