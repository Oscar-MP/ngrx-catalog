import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

// Mock data
import { catalogs } from '../../state/damo-data.catalog';
import { ICatalog } from '../interfaces/ICatalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor() {}

  getCatalogs(): Observable<ICatalog[]> {
    return of(catalogs);
  }

  getCatalog( catalogId: number ): Observable<ICatalog> {
    return this.getCatalogs().pipe(
      map(
        (catalogs: ICatalog[] ) => catalogs.filter( ( c: ICatalog) => c.id === catalogId )[0]
      )
    )
  }


}
