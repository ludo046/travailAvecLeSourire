import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFront4Component } from './project-front4.component';

describe('ProjectFront4Component', () => {
  let component: ProjectFront4Component;
  let fixture: ComponentFixture<ProjectFront4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFront4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFront4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
