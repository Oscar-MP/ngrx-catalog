import { createReducer, on } from "@ngrx/store";
import { CartState } from "./cart.state";
import * as CartActions from './cart.actions';
import { products } from "../../products/state/demo-data.products";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

const initialState: CartState = {
    cart: [],
    error: "",
    totalPrice: "0",
}


export const cartReducer = createReducer<CartState>(
    initialState,
    on(
        CartActions.addProductToCart,
        (state, action): CartState => {
            // TODO -> Sumar el precio del item actual al totalPrice

            const productsIdMap = state.cart.map( i => i.product.id );
            var cartStateClone = [ ...JSON.parse(JSON.stringify(state.cart))];

            if (productsIdMap.includes(action.product.id) ) {
                // The item already exists in the cart so the amount is going to be incremented
                cartStateClone.forEach( (cartItem, cartIndex) => {
                    if ( cartItem.product.id == action.product.id) {
                        cartItem.amount = cartItem.amount + (action.amount || 1)
                    }
                })
            } else {
                // Adding a new product to the cart
                cartStateClone = cartStateClone.concat([{
                    product: action.product,
                    amount: action.amount || 1
                }]);
            }

            return {
                ...state,
                cart: cartStateClone,
            }
        }
    ),
    on(
        CartActions.cleanCart,
        ( state ):CartState => {
            return {
                ...state,
                cart: []
            }
        }
    ),
    on(
        CartActions.removeProductFromCart,
        (state, action): CartState  => {
            return {
                ...state,
                cart: state.cart.filter( p => p.product.id !== action.productId )
            }
        }
    )
)