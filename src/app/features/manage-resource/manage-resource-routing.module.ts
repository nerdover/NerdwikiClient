import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { ManageResourceComponent } from './pages/manage-resource/manage-resource.component';
import { authGuard } from '../../core/auth/auth.guard';
import { EditComponent } from './pages/edit/edit.component';
import { ContentService } from '../../core/services/content.service';

const routes: Routes = [
  {
    path: '',
    component: ManageResourceComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/manage-resource/lessons',
        pathMatch: 'full',
      },
      {
        path: 'lessons',
        loadComponent: () =>
          import('./components/manage-lesson/manage-lesson.component').then(
            (c) => c.ManageLessonComponent
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/manage-category/manage-category.component').then(
            (c) => c.ManageCategoryComponent
          ),
      },
      {
        path: 'topics',
        loadComponent: () =>
          import('./components/manage-topic/manage-topic.component').then(
            (c) => c.ManageTopicComponent
          ),
      },
    ],
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      lesson: (route: ActivatedRouteSnapshot) => {
        return inject(ContentService).getLessonById(route.paramMap.get('id')!);
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageResourceRoutingModule {}
