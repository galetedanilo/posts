import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  {
    path: 'posts',
    loadChildren: () =>
      import('./modules/posts/posts.routes').then((r) => r.POSTS_ROUTES),
  },
];
