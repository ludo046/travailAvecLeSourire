import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFront2Component } from './project-front2.component';

describe('ProjectFront2Component', () => {
  let component: ProjectFront2Component;
  let fixture: ComponentFixture<ProjectFront2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFront2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFront2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
