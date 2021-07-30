import { TestBed } from '@angular/core/testing';

import { RessourseService } from './ressourse.service';

describe('RessourseService', () => {
  let service: RessourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RessourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
