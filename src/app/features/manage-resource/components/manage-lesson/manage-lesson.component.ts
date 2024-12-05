import { Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { Lesson } from '../../../../core/models/lesson';
import { DatePipe } from '@angular/common';
import { DeleteLessonComponent } from '../../panels/delete-lesson/delete-lesson.component';
import { Manage } from '../../../../core/components/base/manage/manage.component';
import { CreateLessonComponent } from '../../panels/create-lesson/create-lesson.component';
import { UpdateLessonComponent } from "../../panels/update-lesson/update-lesson.component";
import { RouterLink } from '@angular/router';
import { RelativeTimePipe } from '../../../../shared/pipes/relative-time.pipe';

@Component({
  selector: 'v-manage-lesson',
  imports: [
    DeleteLessonComponent,
    CreateLessonComponent,
    UpdateLessonComponent,
    RouterLink,
    RelativeTimePipe
],
  templateUrl: './manage-lesson.component.html',
  styleUrl: './manage-lesson.component.scss',
})
export class ManageLessonComponent extends Manage<Lesson> {
  readonly contentService = inject(ContentService);

  dummy: Lesson = {
    id: 'dummy-id',
    title: 'Dummy Lesson',
    content: 'This is a dummy lesson content.',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
