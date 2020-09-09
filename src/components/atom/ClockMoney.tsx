import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../state/globalState';
import { LOGOUT_TIME } from '../App';

const ClockMoney: React.FC = () => {
    const { state } = useContext(GlobalContext);
    const { user } = state;
    const [countdown, setCountdown] = useState(LOGOUT_TIME);
    const value = user ? user.balance : '-';
    const loggingOutText = user ? ` | Logout in ${countdown / 1000}S` : '';
    useEffect(() => {
        let intervalId: number;
        if (user) {
            intervalId = window.setInterval(() => {
                setCountdown(countdown - 1000);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [user, countdown]);

    return (
        <Container>
            <span>
                {`${value} NOK`}
                {loggingOutText}
            </span>
        </Container>
    );
};

const Container = styled.div`
  align-self: center;
  height: 28px;
  margin-left: auto; /* Move to right */

  margin-right: 5px;

  font-weight: 0;
  font-size: 1.2em;

  border-top: 2px solid #828282;
  border-left: 2px solid #828282;

  box-shadow: 1px 1px 0 1px white;

  padding: 0 1em;

  display: flex;

  span {
    align-self: center;
    display: block;
  }
`;

export default ClockMoney;
