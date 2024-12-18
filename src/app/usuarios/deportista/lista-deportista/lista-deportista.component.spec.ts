import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeportistaComponent } from './lista-deportista.component';

describe('ListaDeportistaComponent', () => {
  let component: ListaDeportistaComponent;
  let fixture: ComponentFixture<ListaDeportistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaDeportistaComponent]
    });
    fixture = TestBed.createComponent(ListaDeportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
