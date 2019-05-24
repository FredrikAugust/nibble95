import React, { Dispatch } from 'react';

import styled from 'styled-components';

import Store from './Store';
import { add, Action } from '../reducers/application';

const Container = styled.div`
  background-color: #008282;
  height: 100%;

  padding: 1em;
`;

interface DesktopProps {
  add: typeof add;
  dispatch: Dispatch<Action>;
}

class Desktop extends React.Component<DesktopProps, {}> {
  componentDidMount() {
    const { dispatch, add } = this.props;
    dispatch(add('Nibble95', Store));
  }

  render() {
    return (
      <Container>
        <Store/>
      </Container>
    );
  }
}

export default Desktop;
