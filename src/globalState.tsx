import React, { createContext, useReducer } from 'react';
import { User } from './types/User';

export enum GlobalActionTypes {
    SET_USER = 'SET_USER',
    LOGOUT_USER = 'LOGOUT_USER'
}

type GlobalAction = {
    type: GlobalActionTypes
    payload?: any
}

type GlobalState = {
    user?: User
}

const initialState: GlobalState = {
};

const globalReducer = (state: GlobalState, action: GlobalAction) => {
    switch (action.type) {
        case GlobalActionTypes.SET_USER:
            return { ...state, user: action.payload };
        case GlobalActionTypes.LOGOUT_USER:
            return { ...state, user: undefined };
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
