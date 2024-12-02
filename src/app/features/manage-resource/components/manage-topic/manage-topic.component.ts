import { Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { Manage } from '../../../../core/components/base/manage/manage.component';
import { Topic } from '../../../../core/models/topic';
import { CreateTopicComponent } from '../../panels/create-topic/create-topic.component';
import { UpdateTopicComponent } from '../../panels/update-topic/update-topic.component';
import { DeleteTopicComponent } from '../../panels/delete-topic/delete-topic.component';

@Component({
  selector: 'v-manage-topic',
  imports: [CreateTopicComponent, UpdateTopicComponent, DeleteTopicComponent],
  templateUrl: './manage-topic.component.html',
  styleUrl: './manage-topic.component.scss',
})
export class ManageTopicComponent extends Manage<Topic> {
  readonly contentService = inject(ContentService);

  dummy: Topic = {
    id: 'dummy-id',
    name: 'Dummy Topic',
    categoryId: 'dummy-category-id',
  };
}
