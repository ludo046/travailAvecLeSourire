import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDevFrontComponent } from './modify-dev-front.component';

describe('ModifyDevFrontComponent', () => {
  let component: ModifyDevFrontComponent;
  let fixture: ComponentFixture<ModifyDevFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyDevFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDevFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
