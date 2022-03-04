import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicBodyParamsComponent } from './basic-body-params.component';

describe('BasicBodyParamsComponent', () => {
  let component: BasicBodyParamsComponent;
  let fixture: ComponentFixture<BasicBodyParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicBodyParamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicBodyParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
