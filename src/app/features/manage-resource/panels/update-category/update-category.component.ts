import { Component, inject } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContentService } from '../../../../core/services/content.service';
import { Panel } from '../../../../core/components/base/panel/panel.component';
import { Category } from '../../../../core/models/category';

@Component({
  selector: 'v-update-category',
  imports: [OverlayComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss',
})
export class UpdateCategoryComponent extends Panel<Category> {
  readonly contentService = inject(ContentService);
  private readonly fb = inject(FormBuilder);

  form!: FormGroup;

  failured = false;
  err = '';

  ngOnInit() {
    this.form = this.fb.group({
      id: [this.action().id],
      name: [this.action().name, [Validators.required]],
    });
  }

  update() {
    this.contentService
      .updateCategory(this.action().id, {
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

  get id() {
    return this.form.get('id');
  }

  get name() {
    return this.form.get('name');
  }
}
