import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Project6Component } from './project6.component';

describe('Project6Component', () => {
  let component: Project6Component;
  let fixture: ComponentFixture<Project6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Project6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Project6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
