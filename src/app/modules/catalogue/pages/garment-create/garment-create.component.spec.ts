import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarmentCreateComponent } from './garment-create.component';

describe('GarmentCreateComponent', () => {
  let component: GarmentCreateComponent;
  let fixture: ComponentFixture<GarmentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarmentCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
