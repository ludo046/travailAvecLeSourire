import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFront5Component } from './project-front5.component';

describe('ProjectFront5Component', () => {
  let component: ProjectFront5Component;
  let fixture: ComponentFixture<ProjectFront5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFront5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFront5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
