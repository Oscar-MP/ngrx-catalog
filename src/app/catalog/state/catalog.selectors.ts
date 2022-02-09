import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICatalog } from "../shared/interfaces/ICatalog";
import { CatalogState } from "./catalog.state";

const getCatalogFeatureState = createFeatureSelector<CatalogState>('catalogs');

export const getShowAverageRatingState = createSelector(
    getCatalogFeatureState,
    state => state.showAverageRating
)

export const getCatalogs = createSelector(
    getCatalogFeatureState,
    state => state.catalogs
)

export const getSelectedCatalogId = createSelector(
    getCatalogFeatureState,
    state => state.currentCatalogId
)

export const getSelectedCatalog = createSelector(
    getCatalogFeatureState,
    getSelectedCatalogId,
    (state, currentCatalogId) => {

        if ( currentCatalogId === 0 ) {
            // If ID equals 0 means that we are creating a new catalog.
            return {
                id: 0,
                name: '',
                description: '',
                rating: 0,
                image: ''
            }
        }

        return currentCatalogId ? state.catalogs.find( c => c.id === currentCatalogId ) : null;
    }
);

export const getCatalogError = createSelector(
    getCatalogFeatureState,
    state => state.error
);

export const getCatalogNameById = createSelector(
    getCatalogFeatureState,
    (state: any, params: any) => state.catalogs.filter( (c: ICatalog ) => c.id == params.id )
);