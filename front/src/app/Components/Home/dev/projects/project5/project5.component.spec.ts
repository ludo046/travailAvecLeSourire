import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Project5Component } from './project5.component';

describe('Project5Component', () => {
  let component: Project5Component;
  let fixture: ComponentFixture<Project5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Project5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Project5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
