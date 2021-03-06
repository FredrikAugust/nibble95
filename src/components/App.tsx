import React from "react";

import Desktop from "./Desktop";
import StartBar from "./StartBar";

import { User } from "../types/User";
import { add, minimize, reducer, set_active } from "./../reducers/application";
import { StoreObject } from "./../types/StoreObject";

const Container: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, {});
  const [user, setUser] = React.useState<User>();

  return (
    <div style={{ height: "calc(100vh - 44px)" }}>
      <Desktop
        user={user}
        dispatch={dispatch}
        add={add}
        state={state}
        setUser={setUser}
      />
      <StartBar
        dispatch={dispatch}
        state={state}
        minimize={minimize}
        set_active={set_active}
      />
    </div>
  );
};

export const StoreCtx = React.createContext<Array<StoreObject>>([]);

class App extends React.Component<{}, { items: Array<StoreObject> }> {
  constructor(props: {}) {
    super(props);

    this.state = { items: [] };
  }

  public async componentDidMount() {
    const res = await (
      await fetch(`https://online.ntnu.no/api/v1/inventory/`)
    ).json();
    this.setState({ items: res });
  }

  public render() {
    return (
      <StoreCtx.Provider value={this.state.items}>
        <Container />
      </StoreCtx.Provider>
    );
  }
}

export default App;
