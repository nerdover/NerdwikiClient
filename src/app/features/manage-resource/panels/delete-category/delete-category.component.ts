import { Component, inject } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { ContentService } from '../../../../core/services/content.service';
import { Category } from '../../../../core/models/category';
import { Panel } from '../../../../core/components/base/panel/panel.component';

@Component({
  selector: 'v-delete-category',
  imports: [OverlayComponent],
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.scss',
})
export class DeleteCategoryComponent extends Panel<Category> {
  readonly contentService = inject(ContentService);

  failured = false;
  err = '';

  delete() {
    this.contentService.deleteCategory(this.action().id).subscribe({
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
