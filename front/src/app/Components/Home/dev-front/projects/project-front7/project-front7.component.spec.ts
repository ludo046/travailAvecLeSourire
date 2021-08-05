import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFront7Component } from './project-front7.component';

describe('ProjectFront7Component', () => {
  let component: ProjectFront7Component;
  let fixture: ComponentFixture<ProjectFront7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFront7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFront7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
