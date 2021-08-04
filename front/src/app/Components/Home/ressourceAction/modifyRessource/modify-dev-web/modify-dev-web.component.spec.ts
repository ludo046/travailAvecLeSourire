import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDevWebComponent } from './modify-dev-web.component';

describe('ModifyDevWebComponent', () => {
  let component: ModifyDevWebComponent;
  let fixture: ComponentFixture<ModifyDevWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyDevWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDevWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
