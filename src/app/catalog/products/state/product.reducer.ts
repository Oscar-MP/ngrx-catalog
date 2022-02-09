import { createReducer, on } from "@ngrx/store";
import { IBrandFilter, IFilter, IPriceFilter, IRatingFilter, ITextFilter } from "../../shared/interfaces/IFilter";
import { IProduct } from "../../shared/interfaces/IProduct";
import { ProductsState } from "./product.state";

import * as ProductActions from './produt.actions';

const initalState: ProductsState = {
    products: [],
    currentProductId: null,
    error: "",
    filteredProducts: [],
    appliedFilters: new Set([])
}

export const productReducer = createReducer<ProductsState>(
    initalState,
    on(
        ProductActions.setCurrentProductId,
        (state, action ) => {
            return {
                ...state,
                currentProductId: action.productId
            }
        }
    ),
    on(
        ProductActions.loadProductsSuccess,
        (state, action) => {
            return {
                ...state,
                products: action.products,
                filteredProducts: action.products,
                error: ''
            }
        }
    ),
    on(
        ProductActions.filterProductsByText,
        (state, action) => {
            const filter: ITextFilter = { type: 'text', action: action.input };
           
            return {
                ...state,
                appliedFilters: arrangeAppliedFilters(filter, [...state.appliedFilters])
            }
        }
    ),
    on(
        ProductActions.filterProductsByBrand,
        ( state, action ) => {
            const filter: IBrandFilter = { type: 'brand', action: action.brand };

            return {
                ...state, 
                appliedFilters: arrangeAppliedFilters(filter, [...state.appliedFilters])
            }
        }

    ),
    on(
        ProductActions.filterProductByRating,
        ( state, action ) => {
            const filter: IRatingFilter = { type: 'rating', action: action.rating };

            return {
                ...state,
                appliedFilters: arrangeAppliedFilters(filter, [...state.appliedFilters])
            }

        }
    ),
    on(
        ProductActions.filterProductByPrice,
        (state, action) => {
            const filter: IPriceFilter = {
                type: 'price',
                action: {
                    minPrice: action.minPrice,
                    maxPrice: action.maxPrice
                },
                reset: action.reset || false
            };

            return {
                ...state,
                appliedFilters: arrangeAppliedFilters(filter, [...state.appliedFilters])
            }
        }
    ),
    on(
        ProductActions.filterProductsByText,
        ProductActions.filterProductsByBrand,
        ProductActions.filterProductByRating,
        ProductActions.filterProductByPrice,
        (state, action) => {
            var filteredProducts: IProduct[] = [...state.products];
            var dirtyData = false;

            for ( let filter of state.appliedFilters ) {

                if ( filter.type === 'brand' && filter.action) {
                    // BRAND FILTER
                    let sourceData = dirtyData ? filteredProducts : [...state.products];
                    filteredProducts = sourceData.filter( (p => p.brand.toLowerCase() == filter.action.toLowerCase() ))
                    dirtyData = true;
                }

                if (filter.type === 'text' && filter.action ) {
                    // TEXT FILTER
                    let sourceData = dirtyData ? filteredProducts : [...state.products];
                    
                    filteredProducts = sourceData.filter(
                        ( product: IProduct ) => {
                            return product.name.toLowerCase().includes(filter.action.toLowerCase())
                        }
                    )
                    dirtyData = true;
                }

                if ( filter.type === 'rating' && filter.action ) {
                    // RATING FILTER
                    let sourceData = dirtyData ? filteredProducts : [...state.products];

                    filteredProducts = sourceData.filter(
                        (p: IProduct ) => (p.rating || 0) >= filter.action
                    )
                    dirtyData = true;
                }

                if ( filter.type === 'price' && filter.action ) {
                    // FILTERING BY PRICE 
                    let sourceData = dirtyData ? filteredProducts : [...state.products];

                    filteredProducts = sourceData.filter(
                        ( p: IProduct ) =>  {
                            let [productPrice, productResidue] = p.price.split(',').map(v => +v);

                            if ( productPrice == filter.action.maxPrice && productResidue == 0) {
                                return true
                            }

                            return (productPrice >= filter.action.minPrice) &&
                                   (productPrice < filter.action.maxPrice);                            
                        }
                    )

                    dirtyData = true;
                }
            }

            return {
                ...state,
                filteredProducts: filteredProducts
            }
        }
    )
);




/** SOME HELPER FUNCIONS  */
function arrangeAppliedFilters( filter: IFilter, alreadyAppliedFilters: IFilter[]) {
    var outputFilters;

    outputFilters = new Set([...alreadyAppliedFilters].filter(
        f => f.type !== filter.type
    ))

    if (filter.action && filter.action !== "" && !filter.reset) {
        outputFilters = new Set([...outputFilters, filter])
    }

    return outputFilters;

}