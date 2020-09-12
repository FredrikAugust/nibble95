import React, { ComponentType, createContext, useReducer } from 'react';

export enum ApplicationWindowTypes {
  FOCUSED = 'FOCUSED',
  MINIMIZED = 'MINIMIZED',
  NOT_FOCUSED = 'NOT_FOCUSED',
  CLOSED = 'CLOSED',
}

export enum ApplicationWindowActionTypes {
  SET_ACTIVE = 'SET_ACTIVE',
  MINIMIZE = 'MINIMIZE',
  CLOSE = 'CLOSE',
  ADD = 'ADD',
}

export interface ApplicationWindowState {
  [applicationName: string]: {
    component: ComponentType<any>;
    windowActivity: ApplicationWindowTypes
  };
}

export type ApplicationWindowActions = {
  type: ApplicationWindowActionTypes
  payload: any
}

function minimizeAllOthers(state: ApplicationWindowState, applicationName: string) {
    const new_state = state;

    Object.entries(state).forEach(([name, body]) => {
        if (body.windowActivity === ApplicationWindowTypes.FOCUSED && name !== applicationName) {
            new_state[name].windowActivity = ApplicationWindowTypes.NOT_FOCUSED;
        }
    });

    return { ...new_state };
}

const applicationReducer = (
    state: ApplicationWindowState,
    action: ApplicationWindowActions,
): ApplicationWindowState => {
    switch (action.type) {
        case ApplicationWindowActionTypes.SET_ACTIVE:
            return minimizeAllOthers(
                {
                    ...state,
                    [action.payload]: {
                        ...state[action.payload],
                        windowActivity: ApplicationWindowTypes.FOCUSED,
                    },
                },
                action.payload,
            );
        case ApplicationWindowActionTypes.MINIMIZE:
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    windowActivity: ApplicationWindowTypes.MINIMIZED,
                },
            };
        case ApplicationWindowActionTypes.CLOSE:
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    windowActivity: ApplicationWindowTypes.CLOSED,
                },
            };
        case ApplicationWindowActionTypes.ADD:
            return minimizeAllOthers(
                {
                    ...state,
                    [action.payload.name]: {
                        component: action.payload.component,
                        windowActivity: ApplicationWindowTypes.FOCUSED,
                    },
                },
                action.payload.name,
            );
        default:
            return { ...state };
    }
};

export const setActiveWindow = (windowName: string) => (
    { type: ApplicationWindowActionTypes.SET_ACTIVE, payload: windowName }
);

export const minimizeWindow = (windowName: string) => (
    { type: ApplicationWindowActionTypes.MINIMIZE, payload: windowName }
);

export const addWindow = (windowName: string, component: ComponentType<any>) => (
    { type: ApplicationWindowActionTypes.ADD, payload: { component, name: windowName } }
);
export const closeWindow = (windowName: string) => (
    { type: ApplicationWindowActionTypes.CLOSE, payload: windowName }
);
export const getWindowActivityFunction = (activity: ApplicationWindowTypes): Function => {
    if (activity === ApplicationWindowTypes.MINIMIZED
    || activity === ApplicationWindowTypes.NOT_FOCUSED) {
        return setActiveWindow;
    }
    return minimizeWindow;
};

export type ApplicationWinodwDispatch = ({ type }: ApplicationWindowActions) => void

type ApplicationWindowContextProps = {
  AWState: ApplicationWindowState
  AWDispatch: ApplicationWinodwDispatch
}

export const ApplicationWindowContext = createContext({} as ApplicationWindowContextProps);

type ApplicationWindowProviderProps = {
  children: any
}

export const ApplicationWindowProvider = (props: ApplicationWindowProviderProps) => {
    const [AWState, AWDispatch] = useReducer(applicationReducer, { });
    const { children } = props;

    return (
        <ApplicationWindowContext.Provider
            value={{ AWState, AWDispatch }}
        >
            {children}
        </ApplicationWindowContext.Provider>
    );
};
