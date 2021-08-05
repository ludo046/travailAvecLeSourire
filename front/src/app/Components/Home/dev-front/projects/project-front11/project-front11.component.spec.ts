import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFront11Component } from './project-front11.component';

describe('ProjectFront11Component', () => {
  let component: ProjectFront11Component;
  let fixture: ComponentFixture<ProjectFront11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFront11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFront11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
