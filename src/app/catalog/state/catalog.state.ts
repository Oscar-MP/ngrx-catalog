import * as AppState from '../../state/app.state';
import { ICatalog } from '../shared/interfaces/ICatalog';


export interface State extends AppState.State {
    catalogs: CatalogState;
}

export interface CatalogState {
    showAverageRating: boolean;
    currentCatalogId: number | null;
    catalogs: ICatalog[];
    error: string
}