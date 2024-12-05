import { Component, inject, input } from '@angular/core';
import { Lesson } from '../../../../core/models/lesson';
import { LessonCardComponent } from '../../components/lesson-card/lesson-card.component';
import { Title } from '@angular/platform-browser';
import { Category } from '../../../../core/models/category';

@Component({
  selector: 'v-category',
  imports: [LessonCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  category = input<Category>();
  lessons = input<Lesson[]>();
  private title = inject(Title);

  ngOnInit() {
    this.title.setTitle(this.category()?.name + ' - เนิร์ดวิกิ');
  }
}
