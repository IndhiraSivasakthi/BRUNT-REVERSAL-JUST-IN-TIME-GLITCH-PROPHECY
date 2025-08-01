import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStaffsComponent } from './view-staffs.component';

describe('ViewStaffsComponent', () => {
  let component: ViewStaffsComponent;
  let fixture: ComponentFixture<ViewStaffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStaffsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStaffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
