import React from 'react';

import StartBar from './StartBar'
import Desktop from './Desktop'

import { StoreObject } from './../types/StoreObject';
import { add, minimize, set_active, reducer } from './../reducers/application';
import { User } from '../types/User';

const Container: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, {});
  const [user, setUser] = React.useState<User>();

  return (
    <div style={{ height: 'calc(100vh - 44px)' }}>
      <Desktop user={user} dispatch={dispatch} add={add} state={state} setUser={setUser} />
      <StartBar dispatch={dispatch} state={state} minimize={minimize} set_active={set_active} />
    </div>
  );
}

export const StoreCtx = React.createContext<StoreObject[]>([]);

class App extends React.Component<{}, { items: StoreObject[] }> {
  constructor(props: {}) {
    super(props);

    this.state = { items: [] };
  }

  async componentDidMount() {
    const res = await(await fetch(`https://online.ntnu.no/api/v1/inventory/`)).json();
    this.setState({ items: res });
  }

  render() {
    return (
      <StoreCtx.Provider value={this.state.items}>
        <Container />
      </StoreCtx.Provider>
    );
  }
}

export default App;