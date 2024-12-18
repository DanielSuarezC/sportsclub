import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeportistaComponent } from './registro-deportista.component';

describe('RegistroDeportistaComponent', () => {
  let component: RegistroDeportistaComponent;
  let fixture: ComponentFixture<RegistroDeportistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroDeportistaComponent]
    });
    fixture = TestBed.createComponent(RegistroDeportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
