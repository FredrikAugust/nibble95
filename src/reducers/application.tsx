export interface State {
  [applicationName: string]: {
    component: React.ComponentType<any>;
    state: "focused" | "minimized" | "not_focused";
  };
}

export type Action =
  | { type: "set_active"; applicationName: string }
  | { type: "minimize"; applicationName: string }
  | {
      type: "add";
      applicationName: string;
      component: React.ComponentType<any>;
    };

function minimizeAllOthers(state: State, applicationName: string) {
  const new_state = state;

  Object.entries(state).forEach(([name, body]) => {
    if (body.state === "focused" && name !== applicationName) {
      new_state[name].state = "not_focused";
    }
  });

  return { ...new_state };
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "set_active":
      return minimizeAllOthers(
        {
          ...state,
          [action.applicationName]: {
            ...state[action.applicationName],
            state: "focused"
          }
        },
        action.applicationName
      );
    case "minimize":
      return {
        ...state,
        [action.applicationName]: {
          ...state[action.applicationName],
          state: "minimized"
        }
      };
    case "add":
      return minimizeAllOthers(
        {
          ...state,
          [action.applicationName]: {
            component: action.component,
            state: "focused"
          }
        },
        action.applicationName
      );
  }
};

const set_active = (
  applicationName: string
): { type: "set_active"; applicationName: string } => ({
  type: "set_active",
  applicationName
});

const minimize = (
  applicationName: string
): { type: "minimize"; applicationName: string } => ({
  type: "minimize",
  applicationName
});

const add = (
  applicationName: string,
  component: React.ComponentType<any>
): {
  type: "add";
  applicationName: string;
  component: React.ComponentType<any>;
} => ({
  type: "add",
  applicationName,
  component
});

export { reducer, set_active, minimize, add };
