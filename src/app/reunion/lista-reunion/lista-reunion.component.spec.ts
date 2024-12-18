import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReunionComponent } from './lista-reunion.component';

describe('ListaReunionComponent', () => {
  let component: ListaReunionComponent;
  let fixture: ComponentFixture<ListaReunionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaReunionComponent]
    });
    fixture = TestBed.createComponent(ListaReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
