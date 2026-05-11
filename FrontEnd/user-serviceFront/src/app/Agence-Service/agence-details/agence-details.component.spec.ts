import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceDetailsComponent } from './agence-details.component';

describe('AgenceDetailsComponent', () => {
  let component: AgenceDetailsComponent;
  let fixture: ComponentFixture<AgenceDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgenceDetailsComponent]
    });
    fixture = TestBed.createComponent(AgenceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
