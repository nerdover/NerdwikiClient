import { Component, inject } from '@angular/core';
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
import { Lesson } from '../../../../core/models/lesson';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { UploadService } from '../../../../core/services/upload.service';

@Component({
  selector: 'v-update-lesson',
  imports: [OverlayComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './update-lesson.component.html',
  styleUrl: './update-lesson.component.scss',
})
export class UpdateLessonComponent extends Panel<Lesson> {
  readonly contentService = inject(ContentService);
  private readonly fb = inject(FormBuilder);
  private readonly uploadService = inject(UploadService);

  form!: FormGroup;

  filteredTopics: Topic[] = [];

  failured = false;
  err = '';

  imageUrl?: string;

  ngOnInit() {
    this.imageUrl = this.action().cover;
    this.form = this.fb.group({
      categoryId: [this.action().categoryId ?? '-'],
      topicId: [this.action().topicId ?? '-'],
      id: [this.action().id],
      title: [this.action().title, [Validators.required]],
      description: [this.action().description],
    });

    this.categoryId!.valueChanges.subscribe((selectedCategoryId) => {
      this.filteredTopics =
        this.contentService
          .topics()
          ?.filter((topic) => topic.categoryId === selectedCategoryId) ?? [];
      console.log(this.filteredTopics);
      this.topicId!.reset();
    });
  }

  update() {
    this.contentService
      .updateLesson(this.action().id, {
        categoryId: this.action().categoryId,
        topicId: this.action().topicId,
        id: this.action().id,
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
  }

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
