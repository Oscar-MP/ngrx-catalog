import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from '../../shared/interfaces/IProduct';

import * as ProductSelectors from '../state/product.selectors';
import * as ProductActions from '../state/produt.actions';
import * as ShoppingCartAction from '../../shopping-cart/state/cart.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {

  currentProduct$!: Observable<IProduct | null | undefined>
  currentProductId!: string;
  amountOfProducts: number = 1;
  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentProduct$ = this.store.select(ProductSelectors.getCurrentProduct);

    this.activatedRoute.paramMap.subscribe(
      params => {
        const id = params.get('productId') || "";
        if (!this.currentProductId || this.currentProductId != id ) {
          this.currentProductId = id;
          this.store.dispatch(ProductActions.loadSingleProduct({ productId: this.currentProductId }));
          this.store.dispatch(ProductActions.setCurrentProductId({ productId: this.currentProductId }));
        } 
      }
    )
  }

  onBuyButtonClicked( event: Event, product: IProduct ): void {
    this.store.dispatch(ShoppingCartAction.addProductToCart({ product: product, amount: this.amountOfProducts }))
  }

}
