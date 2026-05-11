import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAvisComponent } from './edit-avis.component';

describe('EditAvisComponent', () => {
  let component: EditAvisComponent;
  let fixture: ComponentFixture<EditAvisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAvisComponent]
    });
    fixture = TestBed.createComponent(EditAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
