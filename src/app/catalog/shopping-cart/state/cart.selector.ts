import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICartItem } from "../../shared/interfaces/ICartItem";
import { CartState } from "./cart.state";

const getCartFeatureState = createFeatureSelector<CartState>('cart');


export const getCartProducts = createSelector(
    getCartFeatureState,
    state => state.cart
);

export const getAmountOfItems = createSelector(
    getCartFeatureState,
    state => state.cart.map( e => (e.amount || 1) ).reduce( (prev, current) => prev + current, 0 )
);

export const getTotalPrice = createSelector(
    getCartFeatureState,
    (state) => {

        if (!state.cart || state.cart.length < 1 ) {
            return "0"
        } else if (state.cart.length === 1) {
            let product = state.cart[0];

            return String(product.amount * parseFloat(product.product.price.split(",").join(".")))
        }

        return state.cart.reduce((prev: any, current: any): any => {
            if ( typeof prev === 'object') {
                prev = parseInt(prev.product.price.split(",").join(".")) * +prev.amount
            }
            if (!current) current = '0'
            current = parseFloat(current.product.price.split(",").join(".")) * +current.amount;
            return String(parseFloat(prev) + current);
        })
    }
);

export const getCartError = createSelector(
    getCartFeatureState,
    state => state.error
);
