import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceEmailComponent } from './agence-email.component';

describe('AgenceEmailComponent', () => {
  let component: AgenceEmailComponent;
  let fixture: ComponentFixture<AgenceEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgenceEmailComponent]
    });
    fixture = TestBed.createComponent(AgenceEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
