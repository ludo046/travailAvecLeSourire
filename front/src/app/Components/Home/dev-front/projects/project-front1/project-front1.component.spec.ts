import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFront1Component } from './project-front1.component';

describe('ProjectFront1Component', () => {
  let component: ProjectFront1Component;
  let fixture: ComponentFixture<ProjectFront1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFront1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFront1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
