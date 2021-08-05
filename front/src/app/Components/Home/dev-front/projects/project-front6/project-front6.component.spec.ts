import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFront6Component } from './project-front6.component';

describe('ProjectFront6Component', () => {
  let component: ProjectFront6Component;
  let fixture: ComponentFixture<ProjectFront6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFront6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFront6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
