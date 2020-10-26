import React, { useContext, useEffect, FC, Dispatch } from "react";
import styled from "styled-components";
import {
  ApplicationWindowContext,
  setActiveWindow,
  closeWindow,
  getWindowActivityFunction,
  ApplicationWindowTypes,
} from "../../state/applicationWindowState";
import Button from "../../atom/Button";
import ClockMoney from "./ClockMoney";
import { GlobalContext, Themes, GlobalAction } from "../../state/globalState";
import { setTheme } from "../../state/actions";
import BarApplication from "./BarApplication";

import * as windows95Theme from "./themes/windows95";
import * as defaultTheme from "./themes/default";

type StartBarProps = {
  theme: Themes;
};

const StartBar: FC<StartBarProps> = ({ theme }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { AWState, AWDispatch } = useContext(ApplicationWindowContext);
  const { user } = state;

  useEffect(() => {
    if (!user) {
      AWDispatch(setActiveWindow("Login"));
    } else {
      AWDispatch(closeWindow("Login"));
      AWDispatch(setActiveWindow("Butikk"));
    }
  }, [user, AWDispatch]);

  const setWindowActivity = (activity: ApplicationWindowTypes, name: string) =>
    AWDispatch(getWindowActivityFunction(activity)(name));

  return (
    <Container theme={state.theme}>
      <Button
        onClick={() => {
          if (state.theme == "DEFAULT") dispatch(setTheme(Themes.WINDOWS95));
          if (state.theme == "WINDOWS95") dispatch(setTheme(Themes.DEFAULT));
        }}
        text="Start"
        icon={`${process.env.PUBLIC_URL}/images/themes/${theme}/start.png`}
      />
      {Object.entries(AWState).map(([name, application]) => (
        <BarApplication
          key={name}
          setWindowActivity={setWindowActivity}
          name={name}
          activity={application.windowActivity}
        />
      ))}
      <ClockMoney theme={state.theme} />
    </Container>
  );
};

const Container = styled.div`
  ${(props) => {
    switch (props.theme) {
      case Themes.WINDOWS95:
        return windows95Theme.Main;
      case Themes.DEFAULT:
        return defaultTheme.Main;
      default:
        return null;
    }
  }}
`;

export default StartBar;
