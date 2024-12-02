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
  selector: 'v-create-topic',
  imports: [OverlayComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './create-topic.component.html',
  styleUrl: './create-topic.component.scss',
})
export class CreateTopicComponent extends Panel<Topic> {
  readonly contentService = inject(ContentService);
  private readonly fb = inject(FormBuilder);

  form!: FormGroup;

  failured = false;
  err = '';

  ngOnInit() {
    this.form = this.fb.group({
      categoryId: [null],
      id: ['', Validators.required],
      name: ['', [Validators.required]],
    });
  }

  create = () => {
    this.contentService
      .createTopic({
        categoryId: this.categoryId?.value,
        id: this.id?.value,
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
  };

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
