import * as AppState from '../../../state/app.state'
import { ICartItem } from '../../shared/interfaces/ICartItem';
import { IProduct } from '../../shared/interfaces/IProduct';

export interface State extends AppState.State {
    cart: CartState;
}

export interface CartState{
    cart: ICartItem[];
    error: string;
    totalPrice: string;

}