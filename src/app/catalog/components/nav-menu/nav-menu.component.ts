import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from '../../shared/interfaces/IProduct';

import * as CartSelectors from '../../shopping-cart/state/cart.selector';
import * as CartActions from '../../shopping-cart/state/cart.actions';
import { isLogged } from 'src/app/auth/state/auth.selectors';

import { ICartItem } from '../../shared/interfaces/ICartItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  
  amountOfItemsInCart$!: Observable<number>;
  cartProducts$!: Observable<ICartItem[]>;

  isLogged$!: Observable<boolean>;
  
  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.amountOfItemsInCart$ = this.store.select(CartSelectors.getAmountOfItems)
    this.cartProducts$ = this.store.select(CartSelectors.getCartProducts);
    this.isLogged$ = this.store.select(isLogged);
  }


  removeItemFromCart(event: Event, productId: string): void {
    event.stopPropagation();
    this.store.dispatch(CartActions.removeProductFromCart({ productId }))
  }

  emptyCart(event: Event): void {
    event.stopPropagation();
    this.store.dispatch(CartActions.cleanCart())
  }

  onUserMenuButtonClick( event: Event, status: boolean ) {
    var target = event.currentTarget;

    if (!status) {
      this.router.navigate(['/auth/login'])
    }

  }



}
