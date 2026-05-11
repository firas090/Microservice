import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceResponsableComponent } from './agence-responsable.component';

describe('AgenceResponsableComponent', () => {
  let component: AgenceResponsableComponent;
  let fixture: ComponentFixture<AgenceResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgenceResponsableComponent]
    });
    fixture = TestBed.createComponent(AgenceResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
