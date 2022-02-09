import { createReducer, on } from "@ngrx/store";
import * as CatalogActions from "./catalog.actions";
import { CatalogState } from "./catalog.state";

const initialState: CatalogState = {
    showAverageRating: true,
    currentCatalogId: null,
    catalogs: [],
    error: ''
}

export const catalogReducer = createReducer<CatalogState>(
    initialState,
    on(
        CatalogActions.toggleAverageCatalogRating, 
        (state): CatalogState => {
            return {
                ...state,
                showAverageRating: !state.showAverageRating
            }
        }
    ),
    on(
        CatalogActions.setCurrentCatalog, 
        (state, action) => {
            return {
                ...state,
                currentCatalogId: action.catalogId
            }
        }
    ),
    on(CatalogActions.loadCatalogsSuccess, 
        ( state, action ): CatalogState => {
            return {
                ...state,
                catalogs: action.catalogs,
                error: ''
            }
    }),
    on(CatalogActions.loadCatalogsError, 
        (state, action) => {
            return {
                ...state,
                products: [],
                error: action.error
            }
    })
);