import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCatalogError, getCatalogs, getSelectedCatalogId, getShowAverageRatingState } from '../state/catalog.selectors';
import { State } from '../state/catalog.state';
import * as CatalogActions from '../state/catalog.actions';
import { ICatalog } from '../shared/interfaces/ICatalog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {

  public showAverageRating$!: Observable<boolean>;
  public catalogs$!: Observable<ICatalog[]>;
  public errorMessage$!: Observable<string>;
  public selectedCatalogId$!: Observable<number | null>

  constructor(
    private store: Store<State>,
    private router: Router
  ) {
   }

  ngOnInit(): void {
    this.showAverageRating$ = this.store.select(getShowAverageRatingState);
    this.catalogs$ = this.store.select(getCatalogs);
    this.errorMessage$ = this.store.select( getCatalogError );
    this.selectedCatalogId$ = this.store.select(getSelectedCatalogId)

    this.store.dispatch( CatalogActions.loadCatalogs());
  }

  toggleAverageRatingInfo():void {
    this.store.dispatch(CatalogActions.toggleAverageCatalogRating());
  }

  onCatalogItemClick( event: Event, catalog: ICatalog ): void {
    this.store.dispatch(CatalogActions.setCurrentCatalog({ catalogId: catalog.id }))
  }

  navigateToCatalogProducts( catalogId: number ): void {
    // We use timeout to prevent the onCatalogItemClick dispatch not triggering.
    setTimeout( () => {
      this.router.navigate(['c', catalogId, 'p'])
    }, 0)
  }

}
