import React, { FC, useContext } from "react";
import styled from "styled-components";
import { exitUser } from "../../state/actions";
import {
  ApplicationWindowContext,
  setActiveWindow,
} from "../../state/applicationWindowState";
import { GlobalContext, Themes } from "../../state/globalState";
import { TitleBarButtonType as ButtonType } from "./TitleBarButton";
import WindowBar from "./WindowBar";
import * as windows95Theme from "./themes/windows95";
import * as defaultTheme from "./themes/default";

type WindowProps = {
  className?: string;
  name: string;
  onClose?: () => void;
  titleBarButtonType?: ButtonType;
  theme: Themes;
};

const Window: FC<WindowProps> = ({
  className,
  name,
  onClose,
  children,
  theme,
  titleBarButtonType = ButtonType.close,
}) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { AWDispatch } = useContext(ApplicationWindowContext);
  const onClick = () => AWDispatch(setActiveWindow(name));
  const signOut = () => exitUser(dispatch);
  return (
    <Container className={className} onClick={onClick}>
      <WindowBar
        name={name}
        onClose={state.user ? signOut : onClose}
        buttonType={state.user ? ButtonType.logout : titleBarButtonType}
        theme={state.theme}
      />
      {children}
    </Container>
  );
};

const Container = styled.div`
  ${(props) => {
    switch (props.theme) {
      case Themes.WINDOWS95:
        return windows95Theme.Window;
      case Themes.DEFAULT:
        return null;
      default:
        return null;
    }
  }}
`;

export default Window;
