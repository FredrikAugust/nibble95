import React, { useContext, useEffect, FC } from 'react';
import styled from 'styled-components';
import {
    ApplicationWindowContext,
    setActiveWindow,
    closeWindow,
    getWindowActivityFunction,
    ApplicationWindowTypes,
} from '../../state/applicationWindowState';
import Button from '../../atom/Button';
import ClockMoney from './ClockMoney';
import { GlobalContext } from '../../state/globalState';
import BarApplication from './BarApplication';

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

    const setWindowActivity = (activity: ApplicationWindowTypes, name: string) => (
        AWDispatch(getWindowActivityFunction(activity)(name))
    );

    return (
        <Container>
            <Button
                onClick={() => {}}
                text="Start"
                icon={`${process.env.PUBLIC_URL}/start.png`}
            />
            {Object.entries(AWState).map(([name, application]) => (
                <BarApplication
                    key={name}
                    setWindowActivity={setWindowActivity}
                    name={name}
                    activity={application.windowActivity}
                />
            ))}
            <ClockMoney />
        </Container>
    );
};

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

export default StartBar;
