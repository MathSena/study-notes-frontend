import { TestBed } from '@angular/core/testing';

import { StudyNotesService } from './study-notes.service';

describe('StudyNotesService', () => {
  let service: StudyNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
