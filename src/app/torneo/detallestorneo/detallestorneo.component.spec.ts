import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallestorneoComponent } from './detallestorneo.component';

describe('DetallestorneoComponent', () => {
  let component: DetallestorneoComponent;
  let fixture: ComponentFixture<DetallestorneoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallestorneoComponent]
    });
    fixture = TestBed.createComponent(DetallestorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
