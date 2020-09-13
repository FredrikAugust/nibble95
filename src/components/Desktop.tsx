import React, { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';
import { ApplicationWindowContext } from '../state/applicationWindowState';
import { GlobalContext } from '../state/globalState';

const Desktop: FunctionComponent = () => {
    const { state } = useContext(GlobalContext);
    const { AWState } = useContext(ApplicationWindowContext);

    return (
        <Container>
            {Object.entries(AWState).map(([name, componentState]) => (
                <componentState.component
                    key={name}
                    name={name}
                    windowActivity={componentState.windowActivity}
                    user={state.user}
                />
            ))}
        </Container>
    );
};

const Container = styled.div`
  background-color: #008282;
  height: 100%;

  padding: 1em;
  overflow: hidden;

  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr 1fr;
`;

export default Desktop;
