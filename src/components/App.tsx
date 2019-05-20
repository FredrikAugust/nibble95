import React from 'react';

import styled from 'styled-components';

import StartBar from './StartBar'
import Desktop from './Desktop'

import { StoreObject } from './../types/StoreObject';

const Container = styled.div`
  height: calc(100vh - 44px); /* Height of StartBar */
`;

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
        <Container>
          <Desktop />
          <StartBar />
        </Container>
      </StoreCtx.Provider>
    );
  }
}

export default App;
