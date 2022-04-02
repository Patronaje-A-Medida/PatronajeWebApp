import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPrimaryOutlinedComponent } from './button-primary-outlined.component';

describe('ButtonPrimaryOutlinedComponent', () => {
  let component: ButtonPrimaryOutlinedComponent;
  let fixture: ComponentFixture<ButtonPrimaryOutlinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonPrimaryOutlinedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPrimaryOutlinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
