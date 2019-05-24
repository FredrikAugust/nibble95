export interface State {
  [applicationName: string]: {
    component: React.ComponentType<any>,
    state: 'focused' | 'minimized' | 'not_focused'
  },
}

export type Action = { type: 'set_active', applicationName: string }
  | { type: 'minimize', applicationName: string }
  | { type: 'add', applicationName: string, component: React.ComponentType<any> }

const reducer = (state: State, action: Action): State => {
  console.log(state, action.type);
  switch(action.type) {
    case 'set_active':
      const new_state = state;

      Object.entries(state).forEach(([name, body]) => {
        if (body.state === 'focused' && name !== action.applicationName) {
          new_state[name].state = 'not_focused';
        } else if (name === action.applicationName) {
          new_state[name].state = 'focused';
        }
      });

      return { ...new_state };
    case 'minimize':
      return { ...state, [action.applicationName]: { ...state[action.applicationName], state: 'minimized' }};
    case 'add':
      return { ...state, [action.applicationName]: { component: action.component, state: 'focused' } };
  }
}

const set_active = (applicationName: string): { type: 'set_active', applicationName: string } => ({
  type: 'set_active',
  applicationName
});

const minimize = (applicationName: string): { type: 'minimize', applicationName: string } => ({
  type: 'minimize',
  applicationName
});

const add = (applicationName: string, component: React.ComponentType<any>): { type: 'add', applicationName: string, component: React.ComponentType<any>} => ({
  type: 'add',
  applicationName,
  component
});

export { reducer, set_active, minimize, add };
