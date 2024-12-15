import { Component } from '@angular/core';
import { StudyNotesDisplayComponent } from './study-notes-display/study-notes-display.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudyNotesDisplayComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'study-notes-frontend';
}
