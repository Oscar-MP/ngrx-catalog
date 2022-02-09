import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Store } from '@ngrx/store';
import {  StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from './state/product.reducer';
import { ProductEffects } from './state/product.effects';
import { ProductFiltersComponent } from './product-filters/product-filters.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductCreationComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ProductFiltersComponent
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', productReducer ),
    EffectsModule.forFeature([ ProductEffects ]),
  ]
})
export class ProductsModule { }
