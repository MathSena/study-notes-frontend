import { Component } from '@angular/core';
import { gsap } from 'gsap'; // Importa o GSAP
import { StudyNotesService } from '../study-notes.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-study-notes-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './study-notes-display.component.html',
  styleUrls: ['./study-notes-display.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class StudyNotesDisplayComponent {
  topic: string = '';
  studyNotes: string[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private studyNotesService: StudyNotesService) {}

  // Valida se o tópico é válido
  isTopicValid(): boolean {
    return this.topic.trim().length > 0;
  }

  // Limpar o campo de entrada
  clearTopic() {
    this.topic = '';
    this.studyNotes = [];
    this.errorMessage = '';
  }

  // Gerar notas
  generateNotes() {
    if (!this.isTopicValid()) return;

    this.loading = true;
    this.errorMessage = '';
    this.studyNotes = [];

    // Animação de carregamento usando GSAP
    this.animateLoading();

    this.studyNotesService.getStudyNotes(this.topic).subscribe({
      next: (response) => {
        this.studyNotes = response.topics;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          'Erro ao buscar tópicos. Tente novamente mais tarde.';
        console.error('Erro do backend:', error);
        this.loading = false;
      },
    });
  }

  // Animação para o ícone de carregamento
  animateLoading() {
    gsap.fromTo(
      '.spinner',
      { rotation: 0 },
      { rotation: 360, duration: 1, repeat: -1, ease: 'linear' }
    );

    // Adiciona animação no botão, reduzindo opacidade quando carregando
    gsap.to('.loading-button', {
      opacity: 0.6,
      duration: 0.5,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });
  }

  // Gerar PDF
  generatePDF() {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Tópicos Gerados', 20, 20);

    // Conteúdo do PDF (os tópicos gerados)
    doc.setFontSize(16);
    let y = 30;
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height;

    this.studyNotes.forEach((note) => {
      const splitText = doc.splitTextToSize(note, 180);
      splitText.forEach((line: string) => {
        if (y + lineHeight > pageHeight - 10) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 20, y);
        y += lineHeight;
      });
    });

    // Gerar o PDF
    doc.save('topicos-gerados.pdf');
  }
}
