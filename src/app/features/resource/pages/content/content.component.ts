import { Component, inject, input } from '@angular/core';
import { ContentViewComponent } from '../../../../core/components/content-view/content-view.component';
import { Lesson } from '../../../../core/models/lesson';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'v-content',
  imports: [ContentViewComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  lesson = input<Lesson | null | undefined>(undefined);
  private title = inject(Title);

  ngOnInit() {
    this.title.setTitle(this.lesson()?.title + ' - เนิร์ดวิกิ');
  }
}
