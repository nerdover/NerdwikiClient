import { Component, inject } from '@angular/core';
import { ContentService } from '../../../../core/services/content.service';
import { Manage } from '../../../../core/components/base/manage/manage.component';
import { Category } from '../../../../core/models/category';
import { CreateCategoryComponent } from '../../panels/create-category/create-category.component';
import { UpdateCategoryComponent } from '../../panels/update-category/update-category.component';
import { DeleteCategoryComponent } from '../../panels/delete-category/delete-category.component';

@Component({
  selector: 'v-manage-category',
  imports: [
    CreateCategoryComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,
  ],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss',
})
export class ManageCategoryComponent extends Manage<Category> {
  readonly contentService = inject(ContentService);

  dummy: Category = {
    id: 'dummy-id',
    name: 'Dummy Category',
  };
}
