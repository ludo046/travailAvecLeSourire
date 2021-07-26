import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevFrontComponent } from './dev-front.component';

describe('DevFrontComponent', () => {
  let component: DevFrontComponent;
  let fixture: ComponentFixture<DevFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
