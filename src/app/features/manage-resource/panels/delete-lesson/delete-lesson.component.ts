import { Component, inject } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { Panel } from '../../../../core/components/base/panel/panel.component';
import { Lesson } from '../../../../core/models/lesson';
import { ContentService } from '../../../../core/services/content.service';

@Component({
  selector: 'v-delete-lesson',
  imports: [OverlayComponent],
  templateUrl: './delete-lesson.component.html',
  styleUrl: './delete-lesson.component.scss',
})
export class DeleteLessonComponent extends Panel<Lesson> {
  readonly contentService = inject(ContentService);

  failured = false;
  err = '';

  delete() {
    this.contentService.deleteLesson(this.action().id).subscribe({
      next: () => {
        this.close();
      },
      error: (e) => {
        this.failured = true;
        this.err = e.error;
      },
    });
  }
}
