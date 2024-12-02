import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContentService } from '../../../../core/services/content.service';

@Component({
  selector: 'v-manage-resource',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './manage-resource.component.html',
  styleUrl: './manage-resource.component.scss',
})
export class ManageResourceComponent {
  private readonly contentService = inject(ContentService);
  tabs = [
    {
      path: 'lessons',
      label: 'บทเรียน',
    },
    {
      path: 'categories',
      label: 'หมวดหมู่',
    },
    {
      path: 'topics',
      label: 'หมวดหมู่ย่อย',
    },
  ];

  ngOnInit() {
    this.contentService.loadCategories();
    this.contentService.loadTopics();
    this.contentService.loadLessons();
  }
}
