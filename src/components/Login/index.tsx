import React, { FC, useContext, useState } from "react";
import styled from "styled-components";
import { User } from "../../types/User";
import Window from "../ApplicationWindow/Window";
import { ApplicationWindowTypes } from "../../state/applicationWindowState";
import LoginView from "./Login";
import { GlobalContext, Themes } from "../../state/globalState";
import RegistrationView from "./Registration";
import { setUser } from "../../state/actions";

import * as windows95Theme from "./themes/windows95";
import * as defaultTheme from "./themes/default";

export type LoginProps = {
  className?: string;
  name: string;
  // It used with styled component
  // eslint-disable-next-line react/no-unused-prop-types
  windowActivity: ApplicationWindowTypes;
  user: User;
  theme: Themes;
};

const onEnterPressed = (func: Function) => (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  if (event.key === "Enter") {
    func();
  }
};

const Login: FC<LoginProps> = (props: LoginProps) => {
  const { className, name, user, theme } = props;
  const { state, dispatch } = useContext(GlobalContext);
  const [rfid, setRfid] = useState<string>("");

  const dispatchUser = (connectedUser?: User | null) =>
    dispatch(setUser(connectedUser));
  if (user) return null;
  const View: FC = () =>
    user === undefined ? (
      <LoginView
        theme={theme}
        dispatchUser={dispatchUser}
        setRfid={setRfid}
        onEnter={onEnterPressed}
      />
    ) : (
      <RegistrationView
        theme={theme}
        dispatchUser={dispatchUser}
        rfid={rfid}
        onEnter={onEnterPressed}
      />
    );
  return (
    <Window className={className} name={name} theme={state.theme}>
      <Container theme={theme}>
        <div></div>
        <View />
      </Container>
    </Window>
  );
};

export default styled(Login)`
  ${(props) => {
    switch (props.theme) {
      case Themes.WINDOWS95:
        return windows95Theme.Login;
      case Themes.DEFAULT:
        return defaultTheme.Login;
      default:
        return null;
    }
  }}
`;

const Container = styled.div`
  ${(props) => {
    switch (props.theme) {
      case Themes.WINDOWS95:
        return windows95Theme.Container;
      case Themes.DEFAULT:
        return defaultTheme.Container;
      default:
        return null;
    }
  }}
`;

export const InputField = styled.div`
  ${(props) => {
    switch (props.theme) {
      case Themes.WINDOWS95:
        return windows95Theme.InputField;
      case Themes.DEFAULT:
        return defaultTheme.InputField;
      default:
        return null;
    }
  }}
`;
