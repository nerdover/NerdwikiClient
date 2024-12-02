import { Component, inject } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { ContentService } from '../../../../core/services/content.service';
import { Panel } from '../../../../core/components/base/panel/panel.component';
import { Topic } from '../../../../core/models/topic';

@Component({
  selector: 'v-delete-topic',
  imports: [OverlayComponent],
  templateUrl: './delete-topic.component.html',
  styleUrl: './delete-topic.component.scss',
})
export class DeleteTopicComponent extends Panel<Topic> {
  readonly contentService = inject(ContentService);

  failured = false;
  err = '';

  delete() {
    this.contentService.deleteTopic(this.action().id).subscribe({
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
