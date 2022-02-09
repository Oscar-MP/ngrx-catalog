import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICatalog } from '../../shared/interfaces/ICatalog';
import { getSelectedCatalog, getShowAverageRatingState } from '../../state/catalog.selectors';
import { State } from '../../state/catalog.state';

@Component({
  selector: 'catalog-info',
  templateUrl: './catalog-info.component.html',
  styleUrls: ['./catalog-info.component.scss']
})
export class CatalogInfoComponent implements OnInit {

  public catalog$!: Observable<ICatalog | undefined | null>;
  public showRating$!: Observable<boolean>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.catalog$ = this.store.select(getSelectedCatalog);
    this.showRating$ = this.store.select(getShowAverageRatingState)
  }

}
