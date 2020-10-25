import React, { createContext, useReducer } from "react";
import { User } from "../types/User";
import {
  StoreObject,
  CartItem,
  incrementCartItem,
  createCartItem,
  decrementCartItem,
} from "../types/StoreObject";

export enum GlobalActionTypes {
  SET_USER = "SET_USER",
  LOGOUT_USER = "LOGOUT_USER",
  SET_INVENTORY = "SET_INVENTORY",
  WITHDRAW_BALANCE = "WITHDRAW_BALANCE",
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  EMPTY_CART = "EMPTY_CART",
  SET_IS_LOGGING_OUT = "SET_IS_LOGGING_OUT",
  SET_THEME = "SET_THEME",
}

export enum Themes {
  WINDOWS95 = "WINDOWS95",
  DEFAULT = "DEFAULT",
}

export type GlobalAction = {
  type: GlobalActionTypes;
  payload?: any;
};

type GlobalState = {
  user?: User | null;
  inventory: StoreObject[];
  cart: { [id: number]: CartItem };
  isLoggingOut: boolean;
  theme: Themes;
};

const initialState: GlobalState = {
  inventory: [],
  cart: {},
  isLoggingOut: false,
  theme: Themes.WINDOWS95,
};

const getIncrementedCartItem = (id: number, state: GlobalState): CartItem => {
  if (state.cart[id]) {
    return incrementCartItem(state.cart[id]);
  }
  return createCartItem(id);
};

const getDecrementedCart = (id: number, state: GlobalState) => {
  if (state.cart[id].quantity > 1) {
    return { ...state.cart, [id]: decrementCartItem(state.cart[id]) };
  }
  const removedCart = { ...state.cart };
  delete removedCart[id];
  return { ...removedCart };
};

const globalReducer = (state: GlobalState, action: GlobalAction) => {
  switch (action.type) {
    case GlobalActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case GlobalActionTypes.LOGOUT_USER:
      return { ...state, user: undefined };
    case GlobalActionTypes.SET_INVENTORY:
      return { ...state, inventory: action.payload };
    case GlobalActionTypes.WITHDRAW_BALANCE:
      return {
        ...state,
        user: {
          ...state.user,
          balance: state.user!.balance - action.payload,
        },
      };
    case GlobalActionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload]: getIncrementedCartItem(action.payload, state),
        },
      };
    case GlobalActionTypes.REMOVE_FROM_CART: {
      return {
        ...state,
        cart: getDecrementedCart(action.payload, state),
      };
    }
    case GlobalActionTypes.EMPTY_CART:
      return { ...state, cart: {} };
    case GlobalActionTypes.SET_IS_LOGGING_OUT:
      return { ...state, isLoggingOut: action.payload };
    case GlobalActionTypes.SET_THEME:
      return { ...state, theme: action.payload };
    default:
      return { ...state };
  }
};

type GlobalContextProps = {
  state: GlobalState;
  dispatch: ({ type }: GlobalAction) => void;
};

export const GlobalContext = createContext({} as GlobalContextProps);

type GlobalProviderProps = {
  children: any;
};

export const GlobalProvider = (props: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const { children } = props;

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
