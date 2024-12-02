import { Component, inject, input, output } from '@angular/core';
import { Lesson } from '../../../../core/models/lesson';
import { FormsModule } from '@angular/forms';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { Switch } from '../../../../shared/utils/switch';
import { ContentService } from '../../../../core/services/content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'v-edit',
  imports: [FormsModule, OverlayComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  readonly contentService = inject(ContentService);
  private readonly router = inject(Router);

  failured = false;
  err = '';

  lesson = input<Lesson>();
  closed = output();

  content = '';

  confirmPanel = new Switch();

  ngOnInit() {
    this.content = this.lesson()?.content ?? '';
  }

  update() {
    this.contentService
      .updateContent(this.lesson()!.id, {
        id: this.lesson()?.id,
        content: this.content,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/', 'manage-resource']);
        },
        error: (e) => {
          this.failured = true;
          this.err = e.error;
        },
      });
  }
}
