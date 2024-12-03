import { Component, input } from '@angular/core';
import { ContentViewComponent } from '../../../../core/components/content-view/content-view.component';
import { Lesson } from '../../../../core/models/lesson';

@Component({
  selector: 'v-content',
  imports: [ContentViewComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  lesson = input<Lesson | null | undefined>(undefined);
}
