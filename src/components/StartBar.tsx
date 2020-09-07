import React, { Dispatch, useContext, useEffect } from 'react';
import styled from 'styled-components';
import {
    Action, minimize, set_active, State, ApplicationState,
} from '../reducers/application';
import Button from './atom/Button';
import ClockMoney from './atom/ClockMoney';
import { GlobalContext } from '../globalState';

const Container = styled.div`
  background-color: #c3c3c3;
  padding: 3px 3px 5px 3px;
  border-top: 1px solid white;
  box-shadow: 0px 0px 1px 1px #e8e8e8;
  display: flex;
  height: 44px;
  position: relative;
  z-index: 4815162342;
`;

interface StartBarProps {
  applicationState: State;
  minimizeApp: typeof minimize;
  setActiveApp: typeof set_active;
  applicationDispatch: Dispatch<Action>;
}

const StartBar: React.FC<StartBarProps> = (
    {
        applicationState,
        applicationDispatch,
        minimizeApp,
        setActiveApp,
    }: StartBarProps,
) => {
    const { state } = useContext(GlobalContext);
    const { user } = state;
    const onClick = (startBarState: ApplicationState, name: string) => {
        if (startBarState === ApplicationState.MINIMIZED) {
            applicationDispatch(setActiveApp(name));
        } else if (startBarState === ApplicationState.NOT_FOCUSED) {
            applicationDispatch(setActiveApp(name));
        } else {
            applicationDispatch(minimizeApp(name));
        }
    };

    useEffect(() => {
        if (!user) {
            applicationDispatch(setActiveApp('Login'));
        }
    }, [user]);
    return (
        <Container>
            <Button
                onClick={() => {}}
                text="Start"
                icon={`${process.env.PUBLIC_URL}/start.png`}
            />
            {Object.entries(applicationState).map(([name, info]) => (
                <Button
                    key={name}
                    text={name}
                    application
                    pressed={info.state === 'focused'}
                    onClick={() => onClick(info.state, name)}
                />
            ))}
            <ClockMoney />
        </Container>
    );
};

export default StartBar;
