import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyNotesDisplayComponent } from './study-notes-display.component';

describe('StudyNotesDisplayComponent', () => {
  let component: StudyNotesDisplayComponent;
  let fixture: ComponentFixture<StudyNotesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyNotesDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyNotesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
