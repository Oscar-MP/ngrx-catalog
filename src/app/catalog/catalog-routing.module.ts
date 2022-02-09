import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogCreationComponent } from './catalog-creation/catalog-creation.component';
import { CatalogDetailsComponent } from './catalog-details/catalog-details.component';
import { CatalogListComponent } from './catalog-list/catalog-list.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogListComponent 
  },
  {
    path: 'c',
    component: CatalogListComponent 
  },
  {
    path: 'c/new',
    component: CatalogCreationComponent
  },
  {
      path: 'c/:catalogId',
      component: CatalogDetailsComponent
  },
  {
    path: 'c/:catalogId/p',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsModule ),
    component: ProductsComponent
  },
  {
    path: 'cart',
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then( m => m.ShoppingCartModule )
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
