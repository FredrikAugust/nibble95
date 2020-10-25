import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { GlobalContext, Themes } from "../../state/globalState";
import { LOGOUT_TIME } from "../App";

import * as windows95Theme from "./themes/windows95";
import * as defaultTheme from "./themes/default";

type ClockMoneyProps = {
  theme: Themes;
};

const ClockMoney: React.FC<ClockMoneyProps> = ({ theme }: ClockMoneyProps) => {
  const { state } = useContext(GlobalContext);
  const { user } = state;
  const [countdown, setCountdown] = useState(LOGOUT_TIME);
  const value = user ? user.balance : "-";
  const loggingOutText = user ? ` | Logout in ${countdown / 1000}S` : "";
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
  ${(props) => {
    switch (props.theme) {
      case Themes.WINDOWS95:
        return windows95Theme.Money;
      case Themes.DEFAULT:
        return null;
      default:
        return null;
    }
  }}
`;

export default ClockMoney;
