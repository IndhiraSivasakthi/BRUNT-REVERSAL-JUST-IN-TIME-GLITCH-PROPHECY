import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignedProductsComponent } from './view-assigned-products.component';

describe('ViewAssignedProductsComponent', () => {
  let component: ViewAssignedProductsComponent;
  let fixture: ComponentFixture<ViewAssignedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAssignedProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssignedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
