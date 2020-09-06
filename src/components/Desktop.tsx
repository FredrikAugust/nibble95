import React, { Dispatch, useContext, FunctionComponent, useEffect } from 'react';

import styled from 'styled-components';

import Login from './Login';
import Store from './Store';

import {
    Action, add, set_active, State,
} from '../reducers/application';

const Container = styled.div`
  background-color: #008282;
  height: 100%;

  padding: 1em;
  overflow: hidden;
`;

interface DesktopProps {
  add: typeof add;
  applicationDispatch: Dispatch<Action>;
  applicationState: State;
}

const Desktop: FunctionComponent<DesktopProps> = (props: DesktopProps) => {
  const {
    applicationState,
    applicationDispatch,
    add,
  } = props;

  useEffect(() => {
    applicationDispatch(add('Nibble95', Store))
    applicationDispatch(add('Login', Login))
  }, [add])

  return (
      <Container>
          {Object.entries(applicationState).map(([name, info]) => (
              <info.component
                  key={name}
                  name={name}
                  state={info.state}
                  onClick={() => applicationDispatch(set_active(name))}
              />
          ))}
      </Container>
  );
}

export default Desktop;
