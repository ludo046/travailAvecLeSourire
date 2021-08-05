import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFront8Component } from './project-front8.component';

describe('ProjectFront8Component', () => {
  let component: ProjectFront8Component;
  let fixture: ComponentFixture<ProjectFront8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFront8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFront8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
