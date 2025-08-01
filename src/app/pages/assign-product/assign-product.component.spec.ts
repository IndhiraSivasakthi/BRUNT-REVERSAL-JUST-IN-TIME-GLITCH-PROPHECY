import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProductComponent } from './assign-product.component';

describe('AssignProductComponent', () => {
  let component: AssignProductComponent;
  let fixture: ComponentFixture<AssignProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
