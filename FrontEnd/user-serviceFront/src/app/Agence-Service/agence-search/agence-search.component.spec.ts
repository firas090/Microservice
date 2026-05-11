import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceSearchComponent } from './agence-search.component';

describe('AgenceSearchComponent', () => {
  let component: AgenceSearchComponent;
  let fixture: ComponentFixture<AgenceSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgenceSearchComponent]
    });
    fixture = TestBed.createComponent(AgenceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
