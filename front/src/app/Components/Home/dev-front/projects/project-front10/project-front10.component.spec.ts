import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFront10Component } from './project-front10.component';

describe('ProjectFront10Component', () => {
  let component: ProjectFront10Component;
  let fixture: ComponentFixture<ProjectFront10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFront10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFront10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
