import React, { Dispatch } from 'react';

import styled from 'styled-components';

import Store from './Store';
import { add, Action, State } from '../reducers/application';

const Container = styled.div`
  background-color: #008282;
  height: 100%;

  padding: 1em;
`;

interface DesktopProps {
  add: typeof add;
  dispatch: Dispatch<Action>;
  state: State;
}

class Desktop extends React.Component<DesktopProps, {}> {
  componentDidMount() {
    const { dispatch, add } = this.props;
    dispatch(add('Nibble95', Store));
  }

  render() {
    return (
      <Container>
        {
          Object.entries(this.props.state).map(([name, info]) => (
            <info.component key={name} hidden={info.state === 'minimized'} />
          ))
        }
      </Container>
    );
  }
}

export default Desktop;
