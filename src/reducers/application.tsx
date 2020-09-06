import React, { ComponentType } from 'react';

export enum ApplicationState {
  FOCUSED = 'focused',
  MINIMIZED = 'minimized',
  NOT_FOCUSED = 'not_focused',
}

export interface State {
  [applicationName: string]: {
    component: ComponentType<any>;
    state: ApplicationState
  };
}

export type Action =
  | { type: 'set_active'; applicationName: string }
  | { type: 'minimize'; applicationName: string }
  | {
      type: 'add';
      applicationName: string;
      component: React.ComponentType<any>;
    };

function minimizeAllOthers(state: State, applicationName: string) {
    const new_state = state;

    Object.entries(state).forEach(([name, body]) => {
        if (body.state === ApplicationState.FOCUSED && name !== applicationName) {
            new_state[name].state = ApplicationState.NOT_FOCUSED;
        }
    });

    return { ...new_state };
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'set_active':
            return minimizeAllOthers(
                {
                    ...state,
                    [action.applicationName]: {
                        ...state[action.applicationName],
                        state: ApplicationState.FOCUSED,
                    },
                },
                action.applicationName,
            );
        case 'minimize':
            return {
                ...state,
                [action.applicationName]: {
                    ...state[action.applicationName],
                    state: ApplicationState.MINIMIZED,
                },
            };
        case 'add':
            return minimizeAllOthers(
                {
                    ...state,
                    [action.applicationName]: {
                        component: action.component,
                        state: ApplicationState.FOCUSED,
                    },
                },
                action.applicationName,
            );
        default:
            return { ...state };
    }
};

const set_active = (
    applicationName: string,
): { type: 'set_active'; applicationName: string } => ({
    type: 'set_active',
    applicationName,
});

const minimize = (
    applicationName: string,
): { type: 'minimize'; applicationName: string } => ({
    type: 'minimize',
    applicationName,
});

const add = (
    applicationName: string,
    component: React.ComponentType<any>,
): {
  type: 'add';
  applicationName: string;
  component: React.ComponentType<any>;
} => ({
    type: 'add',
    applicationName,
    component,
});

export {
    reducer, set_active, minimize, add,
};
