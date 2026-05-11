import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportDetailComponent } from './transport-detail.component';

describe('TransportDetailComponent', () => {
  let component: TransportDetailComponent;
  let fixture: ComponentFixture<TransportDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportDetailComponent]
    });
    fixture = TestBed.createComponent(TransportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
