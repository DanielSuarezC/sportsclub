import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAdministrativoComponent } from './registro-administrativo.component';

describe('RegistroAdministrativoComponent', () => {
  let component: RegistroAdministrativoComponent;
  let fixture: ComponentFixture<RegistroAdministrativoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroAdministrativoComponent]
    });
    fixture = TestBed.createComponent(RegistroAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
