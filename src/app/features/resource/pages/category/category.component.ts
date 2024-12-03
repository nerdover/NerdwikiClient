import { Component, input } from '@angular/core';
import { Lesson } from '../../../../core/models/lesson';
import { LessonCardComponent } from "../../components/lesson-card/lesson-card.component";

@Component({
  selector: 'v-category',
  imports: [LessonCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  lessons = input<Lesson[]>();
}
