import React, {
    FunctionComponent, useEffect, useContext,
} from 'react';
import styled from 'styled-components';
import Login from './Login';
import Store from './Store/';
import { ApplicationWindowContext, addWindow, setActiveWindow } from '../state/applicationWindowState';
import { GlobalContext } from '../state/globalState';

const Container = styled.div`
  background-color: #008282;
  height: 100%;

  padding: 1em;
  overflow: hidden;

  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr 1fr;
`;

const Desktop: FunctionComponent = () => {
    const { state } = useContext(GlobalContext);
    const { AWState, AWDispatch } = useContext(ApplicationWindowContext);

    useEffect(() => {
        AWDispatch(addWindow('Nibble95', Store));
        AWDispatch(addWindow('Login', Login));
    }, [AWDispatch]);

    return (
        <Container>
            {Object.entries(AWState).map(([name, componentState]) => {
                const setActive = () => AWDispatch(setActiveWindow(name));
                return (
                    <componentState.component
                        key={name}
                        name={name}
                        windowActivity={componentState.windowActivity}
                        user={state.user}
                        onClick={setActive}
                    />
                );
            })}
        </Container>
    );
};

export default Desktop;
