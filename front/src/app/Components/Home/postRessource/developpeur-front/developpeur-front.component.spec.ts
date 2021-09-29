import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloppeurFrontComponent } from './developpeur-front.component';

describe('DeveloppeurFrontComponent', () => {
  let component: DeveloppeurFrontComponent;
  let fixture: ComponentFixture<DeveloppeurFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloppeurFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloppeurFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
