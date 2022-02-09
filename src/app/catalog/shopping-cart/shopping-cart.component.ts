import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { KccChecking } from 'src/app/shared/decorators/kcc-checking.decorator';
import { ICartItem } from '../shared/interfaces/ICartItem';
import { IProduct } from '../shared/interfaces/IProduct';

import * as ShoppingCartActions from './state/cart.actions';
import * as ShoppingCartSelectors from './state/cart.selector';
import { isLogged } from 'src/app/auth/state/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
@KccChecking
export class ShoppingCartComponent implements OnInit {

  cartProducts$!: Observable<ICartItem[]>;
  totalPrice$!: Observable<any>;
  isLogged$!: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.cartProducts$ = this.store.select(ShoppingCartSelectors.getCartProducts);
    this.totalPrice$ = this.store.select(ShoppingCartSelectors.getTotalPrice);
    this.isLogged$ = this.store.select(isLogged);
  }

  onRemoveProductButtonClicked( event: Event, productId: string ): void {

  }

  onEmptyCartButtonClicked( event: Event ): void {

  }

  navigateToPayWall( event: Event ): void {
    this.router.navigate(['/cart/pay'])
  }
  

}
