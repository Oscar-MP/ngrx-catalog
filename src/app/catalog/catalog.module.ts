import { NgModule } from '@angular/core';
import { CatalogComponent } from './catalog.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CatalogCreationComponent } from './catalog-creation/catalog-creation.component';
import { CatalogDetailsComponent } from './catalog-details/catalog-details.component';
import { CatalogListComponent } from './catalog-list/catalog-list.component';

/* NgRx */
import {  StoreModule } from '@ngrx/store';
import { catalogReducer } from './state/catalog.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CatalogEffects } from './state/catalog.effects';
import { SharedModule } from '../shared/shared.module';
import { CatalogInfoComponent } from './components/catalog-info/catalog-info.component';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    CatalogComponent,
    HeaderComponent,
    FooterComponent,
    CatalogCreationComponent,
    CatalogDetailsComponent,
    CatalogListComponent,
    CatalogInfoComponent,
    NavMenuComponent
  ],
  imports: [
    CatalogRoutingModule,
    StoreModule.forFeature('catalogs', catalogReducer ),
    EffectsModule.forFeature([ CatalogEffects ]),
    SharedModule,
    ShoppingCartModule
  ]
})
export class CatalogModule { }
