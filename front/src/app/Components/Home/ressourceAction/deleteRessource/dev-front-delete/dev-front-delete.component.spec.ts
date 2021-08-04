import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevFrontDeleteComponent } from './dev-front-delete.component';

describe('DevFrontComponent', () => {
  let component: DevFrontDeleteComponent;
  let fixture: ComponentFixture<DevFrontDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevFrontDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevFrontDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
