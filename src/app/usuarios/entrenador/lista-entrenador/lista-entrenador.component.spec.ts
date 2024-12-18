import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEntrenadorComponent } from './lista-entrenador.component';

describe('ListaEntrenadorComponent', () => {
  let component: ListaEntrenadorComponent;
  let fixture: ComponentFixture<ListaEntrenadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaEntrenadorComponent]
    });
    fixture = TestBed.createComponent(ListaEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
