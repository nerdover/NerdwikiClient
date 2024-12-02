import { Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import type { Lesson } from '../../../../core/models/lesson';

@Component({
  selector: 'v-resource',
  imports: [],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.scss'
})
export class ResourceComponent {
  private readonly content = inject(ContentService);
  lessons: Lesson[] = []

  ngOnInit() {
    this.content.getLessons().subscribe(lessons => this.lessons = lessons)
  }
}
