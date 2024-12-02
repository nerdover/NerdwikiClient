import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/pages/landing/landing.component';
import { ResourceComponent } from './features/resource/pages/resource/resource.component';
import { SignInComponent } from './core/auth/pages/sign-in/sign-in.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
      },
      {
        path: 'resource',
        component: ResourceComponent,
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
