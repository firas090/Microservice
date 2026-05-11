import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllAvisComponent } from './list-all-avis.component';

describe('ListAllAvisComponent', () => {
  let component: ListAllAvisComponent;
  let fixture: ComponentFixture<ListAllAvisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAllAvisComponent]
    });
    fixture = TestBed.createComponent(ListAllAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
