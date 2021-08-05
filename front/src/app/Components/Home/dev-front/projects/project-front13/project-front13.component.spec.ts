import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFront13Component } from './project-front13.component';

describe('ProjectFront13Component', () => {
  let component: ProjectFront13Component;
  let fixture: ComponentFixture<ProjectFront13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFront13Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFront13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
