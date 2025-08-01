import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStockComponent } from './view-stock.component';

describe('ViewStockComponent', () => {
  let component: ViewStockComponent;
  let fixture: ComponentFixture<ViewStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
