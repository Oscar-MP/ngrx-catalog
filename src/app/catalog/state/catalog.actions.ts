import { createAction, props } from "@ngrx/store";
import { ICatalog } from "../shared/interfaces/ICatalog";

// Flags and states
export const toggleAverageCatalogRating = createAction('[Catalog] Toggle Average Rating');


// Manage current catalog
export const setCurrentCatalog      = createAction(
        '[Catalog] Set Current Catalog',
        props<{ catalogId: number }>()
    );
export const clearCurrentCatalog    = createAction('[Catalog] Clean Current Catalog');

// Manage Catalogs
export const loadCatalogs        = createAction(
    '[Catalog API] Load Catalogs'
);

export const loadSingleCatalog  = createAction(
    '[Catalog API] Load Single Catalog',
    props<{ catalogId: number }>()
);

export const loadCatalogsSuccess = createAction(
        '[Catalog API] Load Success',
        props<{ catalogs: ICatalog[]}>()
    );
export const loadCatalogsError   = createAction(
        '[Catalog API] Load Failed',
        props<{ error: string }>()
    );