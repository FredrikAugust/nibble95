import React, { createContext, useReducer } from 'react';
import { User } from './types/User';
import { StoreObject } from './types/StoreObject';

export enum GlobalActionTypes {
    SET_USER = 'SET_USER',
    LOGOUT_USER = 'LOGOUT_USER',
    SET_ITEMS = 'SET_ITEMS',
    WITHDRAW_BALANCE = 'WITHDRAW_BALANCE',
}

type GlobalAction = {
    type: GlobalActionTypes
    payload?: any
}

type GlobalState = {
    user?: User | null
    items: StoreObject[]
}

const initialState: GlobalState = {
    items: [],
};

const globalReducer = (state: GlobalState, action: GlobalAction) => {
    switch (action.type) {
        case GlobalActionTypes.SET_USER:
            return { ...state, user: action.payload };
        case GlobalActionTypes.LOGOUT_USER:
            return { ...state, user: undefined };
        case GlobalActionTypes.SET_ITEMS:
            return { ...state, items: action.payload };
        case GlobalActionTypes.WITHDRAW_BALANCE:
            return {
                ...state,
                user: {
                    ...state.user,
                    balance: state.user!.balance - action.payload,
                },
            };
        default: return { ...state };
    }
};

type GlobalContextProps = {
    state: GlobalState
    dispatch: ({ type }: GlobalAction) => void
}

export const GlobalContext = createContext({} as GlobalContextProps);

type GlobalProviderProps = {
    children: any
}

export const GlobalProvider = (props: GlobalProviderProps) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);
    const { children } = props;

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};
