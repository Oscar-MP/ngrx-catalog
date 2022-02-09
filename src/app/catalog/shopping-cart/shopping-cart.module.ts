import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './state/cart.reducer';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { PayCartComponent } from './pay-cart/pay-cart.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ShoppingCartComponent,
    PayCartComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    StoreModule.forFeature('cart', cartReducer),
    SharedModule
  ]
})
export class ShoppingCartModule { }
