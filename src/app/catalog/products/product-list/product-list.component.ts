import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from '../../shared/interfaces/IProduct';

import * as ProductSelector from '../state/product.selectors';
import * as ProductActions from '../state/produt.actions';
import * as CartActions from '../../shopping-cart/state/cart.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products$!: Observable<IProduct[]>;
  routeSubscription!: Subscription
  catalogId: number = 0;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {  
    this.routeSubscription = this.route.params.subscribe( params => {
      this.catalogId = +(this.route.snapshot.paramMap.get('catalogId') || 0)

      if ( this.catalogId === 0 ) {
        // If no catalog selected then we load all products.
        this.store.dispatch(ProductActions.loadProducts());
      } else {
        // If there is a catalog then we load only the catalog's products
        this.store.dispatch(ProductActions.loadCatalogProducts({ catalogId: this.catalogId }))
      }
    });

    this.products$ = this.store.select(ProductSelector.getFilteredProducts)
  }

  ngOnDestroy(): void {
      this.routeSubscription.unsubscribe();
  }

  addProductToCart(event: Event, product: IProduct):void {
    this.store.dispatch(CartActions.addProductToCart({ product }))
  }

}
