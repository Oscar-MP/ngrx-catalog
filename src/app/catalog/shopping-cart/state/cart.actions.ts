import { createAction, props } from "@ngrx/store";
import { IProduct } from "../../shared/interfaces/IProduct";


export const addProductToCart = createAction(
    '[Cart] Add Product To The Cart',
    props<{ product: IProduct, amount?: number }>()
);

export const cleanCart = createAction(
    '[Cart] Clean The Cart'
);

export const getAmountOfItems = createAction(
    '[Cart] Set Amount Of Items'
);

export const removeProductFromCart = createAction(
    '[Car] Remove Item',
    props<{ productId: string }>()
)