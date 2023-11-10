import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHostelDataComponent } from './add-hostel-data.component';

describe('AddHostelDataComponent', () => {
  let component: AddHostelDataComponent;
  let fixture: ComponentFixture<AddHostelDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHostelDataComponent]
    });
    fixture = TestBed.createComponent(AddHostelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
