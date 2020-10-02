import { Dispatch } from 'react';
import { StoreObject } from '../types/StoreObject';
import { User } from '../types/User';
import { GlobalAction, GlobalActionTypes } from './globalState';

export const setUser = (user?: User | null) => (
    { type: GlobalActionTypes.SET_USER, payload: user }
);
export const logoutUser = () => ({ type: GlobalActionTypes.LOGOUT_USER });
export const setInventory = (inventory: StoreObject[]) => (
    { type: GlobalActionTypes.SET_INVENTORY, payload: inventory }
);
export const withdrawBalance = (amount: number) => (
    { type: GlobalActionTypes.WITHDRAW_BALANCE, payload: amount }
);
export const addToCart = (id: number) => ({ type: GlobalActionTypes.ADD_TO_CART, payload: id });
export const removeFromCart = (id: number) => (
    { type: GlobalActionTypes.REMOVE_FROM_CART, payload: id }
);
export const emptyCart = () => ({ type: GlobalActionTypes.EMPTY_CART });
export const setIsLogout = (isLoggingOut: boolean) => (
    { type: GlobalActionTypes.SET_IS_LOGGING_OUT, payload: isLoggingOut }
);
export const exitUser = (dispatch: Dispatch<GlobalAction>) => {
    dispatch(emptyCart());
    dispatch(logoutUser());
};
export const exitUserWithTimer = (dispatch: Dispatch<GlobalAction>) => {
    dispatch(setIsLogout(true));
    setTimeout(() => {
        exitUser(dispatch);
        dispatch(setIsLogout(false));
    }, 3000);
};
export const dispatchPurchaseItems = (dispatch: Dispatch<GlobalAction>, amount: number) => {
    dispatch(withdrawBalance(amount));
    exitUserWithTimer(dispatch);
};
