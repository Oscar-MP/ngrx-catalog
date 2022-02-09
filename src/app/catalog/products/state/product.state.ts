import { IFilter } from '../../shared/interfaces/IFilter';
import { IProduct } from '../../shared/interfaces/IProduct';
import * as AppState from '../../state/catalog.state';



export interface State extends AppState.State {
    products: ProductsState;
}

export interface ProductsState {
    products: IProduct[];
    currentProductId: String | null;
    error: string;
    filteredProducts: IProduct[];
    appliedFilters: Set<IFilter>;
}