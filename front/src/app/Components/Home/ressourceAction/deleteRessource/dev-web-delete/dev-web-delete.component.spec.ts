import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevWebDeleteComponent } from './dev-web-delete.component';

describe('DevWebComponent', () => {
  let component: DevWebDeleteComponent;
  let fixture: ComponentFixture<DevWebDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevWebDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevWebDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
