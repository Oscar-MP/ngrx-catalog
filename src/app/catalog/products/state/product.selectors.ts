import { createAction, createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./product.state";

const getProductsFeatureState = createFeatureSelector<ProductsState>('products');

export const getProducts = createSelector(
    getProductsFeatureState,
    state => state.products
);

export const getFilteredProducts = createSelector(
    getProductsFeatureState,
    state => state.filteredProducts
);

export const getCurrentProductId = createSelector(
    getProductsFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductsFeatureState,
    getCurrentProductId, 
    ( state, currentProductId ) => {
        if (currentProductId === "" ) {
            // Returning an empty product
            return {
                id: "",
                catalog: 0,
                name: "New product",
                description: "",
                brand: "",
                rating: 0,
                price: "00,00"
            }
        }

        return currentProductId ? state.products.find( p => p.id === currentProductId ) : null;

    }
);

export const getAllBrands = createSelector(
    getProductsFeatureState,
    state => new Set(state.products.map( p => p.brand?.toLowerCase()))
);

export const getAppliedFilters = createSelector(
    getProductsFeatureState,
    state => state.appliedFilters
)

export const getMiniumPrice = createSelector(
    getProductsFeatureState,
    state => {
        let minPrice = Math.min(...state.products.map( p => +(p.price.split(',')[0]) )) - 1;

        return isFinite(minPrice) ? minPrice : 0;
    }
)

export const getMaxiumPrice = createSelector(
    getProductsFeatureState,
    state => {
        let maxPrice = Math.max(...state.products.map( p => +(p.price.split(',')[0]) )) + 1;

        return isFinite(maxPrice) ? maxPrice : 100
    }
)