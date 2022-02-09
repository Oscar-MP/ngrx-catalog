import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ProductService } from "../../shared/services/product.service";
import * as ProductActions from './produt.actions';

@Injectable()
export class ProductEffects {
    constructor (
        private actions$: Actions,
        private productService: ProductService
    ) {}

    loadProducts$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            mergeMap( () => this.productService.getProducts().pipe(
                map( products => ProductActions.loadProductsSuccess({ products })),
                catchError( error => of(ProductActions.loadProductsFailure({ error })))
            ))
        )
    })

    loadProductsByCatalog$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(ProductActions.loadCatalogProducts),
            mergeMap( (action) => this.productService.getProductsFromCatalog(action.catalogId).pipe(
                map( products => ProductActions.loadProductsSuccess({ products })),
                catchError( error => of(ProductActions.loadProductsFailure({ error })))
            ))
        )
    })

    loadSingleProduct$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(ProductActions.loadSingleProduct),
            mergeMap( (action ) => this.productService.getProduct(action.productId) .pipe(
                map( product => ProductActions.loadProductsSuccess({ products: [product] })),
                catchError( error => of(ProductActions.loadProductsFailure({ error })))
            ))
        )
    })
}