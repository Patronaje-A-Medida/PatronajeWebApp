import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonActionOutlineComponent } from './button-action-outline.component';

describe('ButtonActionOutlineComponent', () => {
  let component: ButtonActionOutlineComponent;
  let fixture: ComponentFixture<ButtonActionOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonActionOutlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonActionOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
