import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { StudyNotesDisplayComponent } from './study-notes-display/study-notes-display.component';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter([])],
};
