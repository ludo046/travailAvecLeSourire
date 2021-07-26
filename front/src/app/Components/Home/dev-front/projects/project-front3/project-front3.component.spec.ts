import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFront3Component } from './project-front3.component';

describe('ProjectFront3Component', () => {
  let component: ProjectFront3Component;
  let fixture: ComponentFixture<ProjectFront3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFront3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFront3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
