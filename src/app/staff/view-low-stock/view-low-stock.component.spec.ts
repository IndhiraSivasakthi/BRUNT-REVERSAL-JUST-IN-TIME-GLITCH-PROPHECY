import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLowStockComponent } from './view-low-stock.component';

describe('ViewLowStockComponent', () => {
  let component: ViewLowStockComponent;
  let fixture: ComponentFixture<ViewLowStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLowStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLowStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
