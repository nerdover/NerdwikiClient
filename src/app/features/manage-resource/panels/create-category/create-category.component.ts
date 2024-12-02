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
  selector: 'v-create-category',
  imports: [OverlayComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
})
export class CreateCategoryComponent extends Panel<Category> {
  readonly contentService = inject(ContentService);
  private readonly fb = inject(FormBuilder);

  form!: FormGroup;

  failured = false;
  err = '';

  ngOnInit() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', [Validators.required]],
    });
  }

  create = () => {
    this.contentService
      .createCategory({
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

  get id() {
    return this.form.get('id');
  }

  get name() {
    return this.form.get('name');
  }
}
