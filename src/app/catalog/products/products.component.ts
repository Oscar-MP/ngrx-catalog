import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICatalog } from '../shared/interfaces/ICatalog';

import * as CatalogSelectors from '../state/catalog.selectors';
import * as CatalogActions from '../state/catalog.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  currentCatalog$!: Observable<ICatalog | null | undefined>
  currentCatalog!: ICatalog;

  constructor(
    private router: Router,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    

    this.store.select(CatalogSelectors.getSelectedCatalog).subscribe(
      catalog => {
        if ( !catalog || catalog === null ) {
          // Reconstruimos el store a partir de la ruta
          let catalogId = +(this.activatedRoute.snapshot.paramMap.get('catalogId') || 0);
          this.store.dispatch(CatalogActions.loadCatalogs());
          this.store.dispatch(CatalogActions.setCurrentCatalog({ catalogId }));
        } else {
          // No necesitamos reconstruir el store 
          this.currentCatalog = catalog;
        }
      }
    )

    
  }

  navigateBack( event: Event ):void {
    this.router.navigate([".."])
  }
}
