import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../globalState';

const ClockMoney: React.FC = () => {
    const { state } = useContext(GlobalContext);
    const value = state.user ? state.user.balance : '-';

    return (
        <Container>
            <span>
                {`${value} NOK`}
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
