import React, { Dispatch } from 'react';

import styled from 'styled-components';

import {
    Action, minimize, set_active, State,
} from '../reducers/application';
import Button from './atom/Button';
import ClockMoney from './atom/ClockMoney';

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
  state: State;
  minimize: typeof minimize;
  set_active: typeof set_active;
  applicationDispatch: Dispatch<Action>;
}

const StartBar: React.FC<StartBarProps> = (props) => (
    <Container>
        <Button
            onClick={() => {}}
            text="Start"
            icon={`${process.env.PUBLIC_URL}/start.png`}
        />
        {Object.entries(props.state).map(([name, info]) => (
            <Button
                key={name}
                text={name}
                application
                pressed={info.state === 'focused'}
                onClick={() => (info.state === 'minimized'
                    ? props.applicationDispatch(set_active(name))
                    : info.state === 'not_focused'
                        ? props.applicationDispatch(set_active(name))
                        : props.applicationDispatch(minimize(name)))}
            />
        ))}
        <ClockMoney />
    </Container>
);

export default StartBar;
