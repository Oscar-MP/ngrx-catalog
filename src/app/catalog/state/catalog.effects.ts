import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { CatalogService } from "../shared/services/catalog.service";
import * as CatalogActions from './catalog.actions';

@Injectable()
export class CatalogEffects {
    constructor (
        private actions$: Actions,
        private catalogService: CatalogService
    ) {}

    loadCatalogs$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(CatalogActions.loadCatalogs),
            mergeMap( () => this.catalogService.getCatalogs().pipe(
                map( catalogs => CatalogActions.loadCatalogsSuccess({ catalogs })),
                catchError( error => of(CatalogActions.loadCatalogsError({ error })))
            ))
        )
    })

    loadSingleCatalog$ = createEffect (() => {
        return this.actions$.pipe(
            ofType( CatalogActions.loadSingleCatalog ),
            mergeMap( ( actions ) => this.catalogService.getCatalog( actions.catalogId ).pipe(
                map( catalog => CatalogActions.loadCatalogsSuccess({ catalogs: [catalog] })),
                catchError( error => of(CatalogActions.loadCatalogsError({ error })))
            ))
        )
    })
}