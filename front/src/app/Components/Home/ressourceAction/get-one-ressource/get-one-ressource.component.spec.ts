import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOneRessourceComponent } from './get-one-ressource.component';

describe('GetOneRessourceComponent', () => {
  let component: GetOneRessourceComponent;
  let fixture: ComponentFixture<GetOneRessourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetOneRessourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetOneRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
