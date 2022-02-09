import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mergeMap } from 'rxjs';
import { AuthComponent } from './auth/auth.component';
import { CatalogComponent } from './catalog/catalog.component';

const routes: Routes = [
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
    component: AuthComponent
  },
  {
    path: '',
    loadChildren: () => import('./catalog/catalog.module').then( m => m.CatalogModule ),
    component: CatalogComponent
  },
  {
    path: 'c',
    loadChildren: () => import('./catalog/catalog.module').then( m => m.CatalogModule ),
    component: CatalogComponent
  },
  {
    path: '**',
    redirectTo: 'c'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
