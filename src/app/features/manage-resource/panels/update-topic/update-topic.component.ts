import { Component, inject } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Topic } from '../../../../core/models/topic';
import { ContentService } from '../../../../core/services/content.service';
import { Panel } from '../../../../core/components/base/panel/panel.component';

@Component({
  selector: 'v-update-topic',
  imports: [OverlayComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './update-topic.component.html',
  styleUrl: './update-topic.component.scss',
})
export class UpdateTopicComponent extends Panel<Topic> {
  readonly contentService = inject(ContentService);
  private readonly fb = inject(FormBuilder);

  form!: FormGroup;

  failured = false;
  err = '';

  ngOnInit() {
    this.form = this.fb.group({
      categoryId: [this.action().categoryId ?? '-'],
      id: [this.action().id],
      name: [this.action().name, [Validators.required]],
    });
  }

  update() {
    this.contentService
      .updateTopic(this.action().id, {
        categoryId: this.action().categoryId,
        id: this.action().id,
        name: this.name?.value,
      })
      .subscribe({
        next: () => {
          this.close();
        },
        error: (e) => {
          this.failured = true;
          this.err = e.error;
        },
      });
  }

  get categoryId() {
    return this.form.get('categoryId');
  }

  get id() {
    return this.form.get('id');
  }

  get name() {
    return this.form.get('name');
  }
}
