import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TittlePageComponent } from './tittle-page.component';

describe('TittlePageComponent', () => {
  let component: TittlePageComponent;
  let fixture: ComponentFixture<TittlePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TittlePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TittlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
