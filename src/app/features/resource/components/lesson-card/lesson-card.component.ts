import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lesson } from '../../../../core/models/lesson';
import { RelativeTimePipe } from '../../../../shared/pipes/relative-time.pipe';

@Component({
  selector: 'v-lesson-card',
  imports: [RouterLink, RelativeTimePipe],
  templateUrl: './lesson-card.component.html',
  styleUrl: './lesson-card.component.scss',
})
export class LessonCardComponent {
  lesson = input.required<Lesson>();
}
