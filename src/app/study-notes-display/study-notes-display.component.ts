import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudyNotesService } from '../study-notes.service';

@Component({
  selector: 'app-study-notes-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './study-notes-display.component.html',
  styleUrls: ['./study-notes-display.component.css'],
})
export class StudyNotesDisplayComponent {
  topic: string = '';
  studyNotes: string[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private studyNotesService: StudyNotesService) {}

  isTopicValid(): boolean {
    return this.topic.trim().length > 0;
  }

  generateNotes() {
    this.loading = true;
    this.errorMessage = '';
    this.studyNotes = [];

    this.studyNotesService.getStudyNotes(this.topic).subscribe(
      (response) => {
        this.studyNotes = response.topics;
        this.loading = false;
      },
      (error) => {
        this.errorMessage =
          'Erro ao buscar tópicos. Tente novamente mais tarde.';
        console.error('Erro do backend:', error);
        this.loading = false;
      }
    );
  }
}
