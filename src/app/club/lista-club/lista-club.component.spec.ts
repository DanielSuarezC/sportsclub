import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaClubComponent } from './lista-club.component';

describe('ListaClubComponent', () => {
  let component: ListaClubComponent;
  let fixture: ComponentFixture<ListaClubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaClubComponent]
    });
    fixture = TestBed.createComponent(ListaClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
