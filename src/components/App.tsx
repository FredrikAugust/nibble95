import React from 'react';

import styled from 'styled-components';

import StartBar from './StartBar'
import Desktop from './Desktop'

import { StoreObject } from './../types/StoreObject';
import { add, minimize, set_active, reducer } from './../reducers/application';

const _Container: React.FC<{ className?: string }> = props => {
  const [state, dispatch] = React.useReducer(reducer, {});

  return (
    <div className={props.className}>
      <Desktop dispatch={dispatch} add={add} state={state} />
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

const Container = styled(_Container)`
  height: calc(100vh - 44px)
`;

export default App;