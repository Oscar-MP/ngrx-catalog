import { createAction, props } from "@ngrx/store";
import { IProduct } from "../../shared/interfaces/IProduct";


// Manage product selection
export const setCurrentProductId = createAction(
    '[Product] Set Current Product Id',
    props<{ productId: string }>()
);

export const clearCurrentProductId = createAction(
    '[Product] Clear Current Product Selection'
);

// Filtros
export const filterProductsByText = createAction(
    '[Product] Filter by Text',
    props<{ input: string }>()
)

export const filterProductsByBrand = createAction(
    '[Product] Filter by Brand',
    props<{ brand: string }>()
);

export const filterProductByRating = createAction(
    '[Product] Filter by Rating',
    props<{ rating: number }>()
)

export const filterProductByPrice = createAction(
    '[Product] Filter by Price',
    props<{ minPrice: number, maxPrice: number, reset?: boolean}>()
)

// Manage products data 
export const loadProducts = createAction(
    '[Product API] Load  All Products'
);

export const loadCatalogProducts = createAction(
    '[Product API] Load Catalog Products',
    props<{ catalogId: number }>()
)

export const loadSingleProduct = createAction(
    '[Product API] Load Single Product',
    props<{ productId: string }>()
)

export const loadProductsSuccess = createAction(
    '[Product API] Products Load Success',
    props<{ products: IProduct[] }>()
);

export const loadProductsFailure = createAction(
    '[Products API] On Load Products Fails',
    props<{ error: string }>()
);