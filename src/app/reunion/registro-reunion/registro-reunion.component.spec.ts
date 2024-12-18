import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroReunionComponent } from './registro-reunion.component';

describe('RegistroReunionComponent', () => {
  let component: RegistroReunionComponent;
  let fixture: ComponentFixture<RegistroReunionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroReunionComponent]
    });
    fixture = TestBed.createComponent(RegistroReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
