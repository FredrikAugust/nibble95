import React, { Dispatch } from 'react';

import styled from 'styled-components';

import Store from './Store';
import Login from './Login';

import { add, Action, State, set_active } from '../reducers/application';
import { User } from '../types/User';

const Container = styled.div`
  background-color: #008282;
  height: 100%;

  padding: 1em;
  overflow: hidden;
`;

interface DesktopProps {
  add: typeof add;
  dispatch: Dispatch<Action>;
  state: State;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  user: User | undefined;
}

class Desktop extends React.Component<DesktopProps, {}> {
  componentDidMount() {
    const { dispatch, add } = this.props;
    dispatch(add('Nibble95', Store));
    dispatch(add('Login', Login));
  }

  render() {
    return (
      <Container>
        {
          Object.entries(this.props.state).map(([name, info]) => (
            <info.component
              key={name}
              name={name}
              state={info.state}
              onClick={() => this.props.dispatch(set_active(name))}
              setUser={this.props.setUser}
              user={this.props.user}
            />
          ))
        }
      </Container>
    );
  }
}

export default Desktop;
