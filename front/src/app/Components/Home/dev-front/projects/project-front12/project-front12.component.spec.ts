import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFront12Component } from './project-front12.component';

describe('ProjectFront12Component', () => {
  let component: ProjectFront12Component;
  let fixture: ComponentFixture<ProjectFront12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFront12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFront12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
