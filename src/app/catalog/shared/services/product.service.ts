import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import {  products } from '../../products/state/demo-data.products'
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Observable<IProduct[]> {
    // Return all products in an observable 
    return of(products)
  }

  getProductsFromCatalog( catalogId: number ): Observable<IProduct[]> {
    // Return all products from one catalog 
    return this.getProducts().pipe(
      map(
        arr => arr.filter( (p: IProduct) => p.catalog === catalogId )
      )
    )
  }

  getProduct( productId: string ): Observable<IProduct> {
    return this.getProducts().pipe(
      map(
        arr => arr.filter( (p: IProduct) => p.id === productId )[0]
      )
    )
  }
}
