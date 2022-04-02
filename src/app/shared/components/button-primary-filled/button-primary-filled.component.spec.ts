import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPrimaryFilledComponent } from './button-primary-filled.component';

describe('ButtonPrimaryFilledComponent', () => {
  let component: ButtonPrimaryFilledComponent;
  let fixture: ComponentFixture<ButtonPrimaryFilledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonPrimaryFilledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPrimaryFilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
