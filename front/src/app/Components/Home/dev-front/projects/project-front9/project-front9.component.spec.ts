import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFront9Component } from './project-front9.component';

describe('ProjectFront9Component', () => {
  let component: ProjectFront9Component;
  let fixture: ComponentFixture<ProjectFront9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFront9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFront9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
