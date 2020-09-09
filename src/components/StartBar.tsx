import React, { useContext, useEffect, FC } from 'react';
import styled from 'styled-components';
import {
    ApplicationWindowTypes,
    ApplicationWindowContext,
    setActiveWindow,
    minimizeWindow,
    closeWindow,
    ApplicationWinodwDispatch,
    ApplicationWindowState,
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

type BarApplicationsProps = {
    AWState: ApplicationWindowState,
    AWDispatch: ApplicationWinodwDispatch
};

const getOnClick = (activity: ApplicationWindowTypes): Function => {
    if (activity === ApplicationWindowTypes.MINIMIZED
    || activity === ApplicationWindowTypes.NOT_FOCUSED) {
        return setActiveWindow;
    }
    return minimizeWindow;
};

const BarApplications: FC<BarApplicationsProps> = (
    { AWState, AWDispatch }: BarApplicationsProps,
) => {
    const applications = Object.entries(AWState).map(([name, info]) => {
        const onClick = () => AWDispatch(getOnClick(info.windowActivity)(name));
        return (
            <Button
                key={name}
                text={name}
                application
                activity={info.windowActivity}
                onClick={onClick}
            />
        );
    });
    return (
        <>{applications}</>
    );
};

const StartBar: FC = () => {
    const { state } = useContext(GlobalContext);
    const { AWState, AWDispatch } = useContext(ApplicationWindowContext);
    const { user } = state;

    useEffect(() => {
        if (!user) {
            AWDispatch(setActiveWindow('Login'));
        } else {
            AWDispatch(closeWindow('Login'));
            AWDispatch(setActiveWindow('Nibble95'));
        }
    }, [user, AWDispatch]);

    return (
        <Container>
            <Button
                onClick={() => {}}
                text="Start"
                icon={`${process.env.PUBLIC_URL}/start.png`}
            />
            <BarApplications
                AWState={AWState}
                AWDispatch={AWDispatch}
            />
            <ClockMoney />
        </Container>
    );
};

export default StartBar;
