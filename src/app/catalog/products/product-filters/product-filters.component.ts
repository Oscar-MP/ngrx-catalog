import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICatalog } from '../../shared/interfaces/ICatalog';

import * as ProductActions from '../state/produt.actions';
import * as ProductSelectors from '../state/product.selectors';
import { Observable, Subscription } from 'rxjs';
import { IFilter } from '../../shared/interfaces/IFilter';

@Component({
  selector: 'product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFiltersComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  brands$!: Observable<Set<string | undefined>>
  appliedFilters$!: Observable<Set<IFilter>>;


  maxPriceInProductFound: number = 1000;
  minPriceInProductFound: number = 0;


  textSearchExpression: string = "";
  selectedBrand: string | undefined;
  minRating: number = 0;
  minPrice: number = 0;
  maxPrice: number = 1000;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    
    this.brands$ = this.store.select(ProductSelectors.getAllBrands);
    this.appliedFilters$ = this.store.select(ProductSelectors.getAppliedFilters);
    

    this.subscriptions.push(this.store.select(ProductSelectors.getMaxiumPrice).subscribe(
      maxPrice => {
        this.maxPrice = maxPrice;
        this.maxPriceInProductFound = maxPrice
      }
    ));
    
    this.subscriptions.push(this.store.select(ProductSelectors.getMiniumPrice).subscribe(
      minPrice => {
        this.minPrice = minPrice;
        this.minPriceInProductFound = minPrice;
      }
    ));

  }

  ngOnDestroy() {
    this.removeFilters();

    this.subscriptions.forEach( s => s.unsubscribe() )
  }

  onSearchBoxChange( event?: Event ): void {
    setTimeout(() => {
      this.store.dispatch(ProductActions.filterProductsByText({
        input: this.textSearchExpression 
      }))
    }, 0)
  }

  filterByBrand( brand?: string ):void {
    this.store.dispatch(ProductActions.filterProductsByBrand({
      brand: brand || this.selectedBrand || ""
    }))
  }

  onMinRatingChange( rating?: number):void {
    if ( rating ) this.minRating = rating;

    this.minRating = this.minRating > 5 ? 5 : this.minRating;
    this.store.dispatch(ProductActions.filterProductByRating({ rating: this.minRating }));
  }


  onPriceRangeChanged( reset: boolean = false ):void {
    this.store.dispatch(ProductActions.filterProductByPrice({
      minPrice: reset ? this.minPriceInProductFound : this.minPrice,
      maxPrice: reset ? this.maxPriceInProductFound : this.maxPrice,
      reset: reset
    }));
  }


  /** FILTER CLEARS */
  onClearBrandButtonClicked(): void {
    this.removeFilter({ type: 'brand', action: undefined })
  }

  
  removeFilters( filters?: IFilter[]):void {
    filters = filters || 
              [
                { type: 'text', action: "" }, 
                { type: 'brand', action: undefined },
                { type: 'rating', action: 0 },
                { type: 'price', action: undefined}
              ];
    filters.forEach( f => this.removeFilter(f) );
  }

  removeFilter( filter: IFilter ): void {
    if ( filter.type == 'text') {
      this.textSearchExpression = "";
      this.onSearchBoxChange();
    }

    if (filter.type == 'brand') {
      this.selectedBrand = undefined;
      this.filterByBrand();
    }

    if (filter.type == 'rating') {
      this.minRating = 0;
      this.onMinRatingChange();
    }

    if ( filter.type == 'price' ) {
      this.minPrice = this.minPriceInProductFound;
      this.maxPrice = this.maxPriceInProductFound;
      this.onPriceRangeChanged(true);
    }
  }
}
