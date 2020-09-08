import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import {
    ApplicationWindowTypes,
    ApplicationWindowContext,
    setActiveWindow,
    minimizeWindow,
    closeWindow,
} from '../state/applicationWindowState';
import Button from './atom/Button';
import ClockMoney from './atom/ClockMoney';
import { GlobalContext } from '../state/globalState';

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

const StartBar: React.FC = () => {
    const { state } = useContext(GlobalContext);
    const { AWState, AWDispatch } = useContext(ApplicationWindowContext);
    const { user } = state;
    const onClick = (startBarState: ApplicationWindowTypes, name: string) => {
        if (startBarState === ApplicationWindowTypes.MINIMIZED) {
            AWDispatch(setActiveWindow(name));
        } else if (startBarState === ApplicationWindowTypes.NOT_FOCUSED) {
            AWDispatch(setActiveWindow(name));
        } else {
            AWDispatch(minimizeWindow(name));
        }
    };

    useEffect(() => {
        if (!user) {
            AWDispatch(setActiveWindow('Login'));
        } else {
            AWDispatch(closeWindow('Login'));
            AWDispatch(setActiveWindow('Nibble95'));
        }
    }, [user]);
    return (
        <Container>
            <Button
                onClick={() => {}}
                text="Start"
                icon={`${process.env.PUBLIC_URL}/start.png`}
            />
            {Object.entries(AWState).map(([name, info]) => (
                <Button
                    key={name}
                    text={name}
                    application
                    activity={info.windowActivity}
                    onClick={() => onClick(info.windowActivity, name)}
                />
            ))}
            <ClockMoney />
        </Container>
    );
};

export default StartBar;
