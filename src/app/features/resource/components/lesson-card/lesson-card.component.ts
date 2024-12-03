import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lesson } from '../../../../core/models/lesson';

@Component({
  selector: 'v-lesson-card',
  imports: [RouterLink],
  templateUrl: './lesson-card.component.html',
  styleUrl: './lesson-card.component.scss',
})
export class LessonCardComponent {
  lesson = input.required<Lesson>();
}
