import { Component, inject } from '@angular/core';
import { Panel } from '../../../../core/components/base/panel/panel.component';
import { Lesson } from '../../../../core/models/lesson';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContentService } from '../../../../core/services/content.service';
import { Topic } from '../../../../core/models/topic';
import { UploadService } from '../../../../core/services/upload.service';

@Component({
  selector: 'v-create-lesson',
  imports: [OverlayComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './create-lesson.component.html',
  styleUrl: './create-lesson.component.scss',
})
export class CreateLessonComponent extends Panel<Lesson> {
  readonly contentService = inject(ContentService);
  private readonly fb = inject(FormBuilder);
  private readonly uploadService = inject(UploadService);

  form!: FormGroup;

  filteredTopics: Topic[] = [];

  failured = false;
  err = '';

  imageUrl?: string;

  ngOnInit() {
    this.form = this.fb.group({
      categoryId: [null],
      topicId: [null],
      id: ['', Validators.required],
      title: ['', [Validators.required]],
      description: [''],
    });

    this.categoryId!.valueChanges.subscribe((selectedCategoryId) => {
      this.filteredTopics =
        this.contentService
          .topics()
          ?.filter((topic) => topic.categoryId === selectedCategoryId) ?? [];
      this.topicId!.reset();
    });
  }

  create = () => {
    this.contentService
      .createLesson({
        categoryId: this.categoryId?.value,
        topicId: this.topicId?.value,
        id: this.id?.value,
        title: this.title?.value,
        description: this.description?.value,
        cover: this.imageUrl,
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

  get topicId() {
    return this.form.get('topicId');
  }

  get id() {
    return this.form.get('id');
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }

  uploadImage(e: Event) {
    const el = e.target as HTMLInputElement;
    const file = el.files && el.files[0] ? el.files[0] : null;
    if (file) {
      this.uploadService.upload(file).subscribe((filename) => {
        this.imageUrl = filename;
      });
    }
  }

  clearImageUrl(uploadEl?: HTMLInputElement) {
    if (uploadEl) {
      uploadEl.value = '';
    }
    this.imageUrl = undefined;
  }
}
