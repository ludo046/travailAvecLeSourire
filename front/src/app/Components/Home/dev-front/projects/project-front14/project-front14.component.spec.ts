import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFront14Component } from './project-front14.component';

describe('ProjectFront14Component', () => {
  let component: ProjectFront14Component;
  let fixture: ComponentFixture<ProjectFront14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFront14Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFront14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
