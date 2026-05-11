import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceExportComponent } from './agence-export.component';

describe('AgenceExportComponent', () => {
  let component: AgenceExportComponent;
  let fixture: ComponentFixture<AgenceExportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgenceExportComponent]
    });
    fixture = TestBed.createComponent(AgenceExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
