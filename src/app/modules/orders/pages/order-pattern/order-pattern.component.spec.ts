import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPatternComponent } from './order-pattern.component';

describe('OrderPatternComponent', () => {
  let component: OrderPatternComponent;
  let fixture: ComponentFixture<OrderPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
