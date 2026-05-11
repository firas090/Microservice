import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationOptionsComponent } from './reservation-options.component';

describe('ReservationOptionsComponent', () => {
  let component: ReservationOptionsComponent;
  let fixture: ComponentFixture<ReservationOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationOptionsComponent]
    });
    fixture = TestBed.createComponent(ReservationOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
