import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffsComponent } from './add-staffs.component';

describe('AddStaffsComponent', () => {
  let component: AddStaffsComponent;
  let fixture: ComponentFixture<AddStaffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStaffsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
