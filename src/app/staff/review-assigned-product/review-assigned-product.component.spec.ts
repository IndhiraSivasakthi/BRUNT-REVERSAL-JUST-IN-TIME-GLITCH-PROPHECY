import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAssignedProductComponent } from './review-assigned-product.component';

describe('ReviewAssignedProductComponent', () => {
  let component: ReviewAssignedProductComponent;
  let fixture: ComponentFixture<ReviewAssignedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewAssignedProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewAssignedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
