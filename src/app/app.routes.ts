import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { LandingComponent } from './features/landing/pages/landing/landing.component';
import { ResourceComponent } from './features/resource/pages/resource/resource.component';
import { SignInComponent } from './core/auth/pages/sign-in/sign-in.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { ContentComponent } from './features/resource/pages/content/content.component';
import { inject } from '@angular/core';
import { ContentService } from './core/services/content.service';
import { catchError, of } from 'rxjs';
import { CategoryComponent } from './features/resource/pages/category/category.component';
import { Lesson } from './core/models/lesson';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
        title: 'หน้าหลัก - เนิร์ดวิกิ',
      },
      {
        path: 'resource',
        component: ResourceComponent,
        title: 'คลังบทเรียน - เนิร์ดวิกิ',
      },
      {
        path: 'contents/:id',
        component: ContentComponent,
        resolve: {
          lesson: (route: ActivatedRouteSnapshot) => {
            const contentService = inject(ContentService);

            return contentService
              .getLessonById(route.paramMap.get('id')!)
              .pipe(catchError(() => of(null)));
          },
        },
      },
      {
        path: 'categories/:id',
        component: CategoryComponent,
        resolve: {
          category: (route: ActivatedRouteSnapshot) => {
            const contentService = inject(ContentService);

            return contentService.getCategoryById(route.paramMap.get('id')!);
          },
          lessons: (route: ActivatedRouteSnapshot) => {
            const contentService = inject(ContentService);

            return contentService
              .getLessons(route.paramMap.get('id')!)
              .pipe(catchError(() => of<Lesson[]>([])));
          },
        },
      },
      {
        path: 'manage-resource',
        loadChildren: () =>
          import(
            './features/manage-resource/manage-resource-routing.module'
          ).then((m) => m.ManageResourceRoutingModule),
      },
    ],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
];
