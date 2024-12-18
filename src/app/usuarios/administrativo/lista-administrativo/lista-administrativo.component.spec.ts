import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAdministrativoComponent } from './lista-administrativo.component';

describe('ListaAdministrativoComponent', () => {
  let component: ListaAdministrativoComponent;
  let fixture: ComponentFixture<ListaAdministrativoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAdministrativoComponent]
    });
    fixture = TestBed.createComponent(ListaAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
