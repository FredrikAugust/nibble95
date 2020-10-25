import React, { useContext, FC, useState } from "react";
import styled from "styled-components";
import TitleBarButton, {
  TitleBarButtonType as ButtonType,
} from "./TitleBarButton";
import { Themes, GlobalContext } from "../../state/globalState";
import * as windows95Theme from "./themes/windows95";
import * as defaultTheme from "./themes/default";
import { ApplicationWindowContext } from "../../state/applicationWindowState";

type WindowBarProps = {
  name: string;
  onClose?: () => void;
  buttonType: ButtonType;
  theme: Themes;
};

const WindowBar: React.FC<WindowBarProps> = ({
  name,
  onClose,
  buttonType,
  theme,
}) => {
  const { state, dispatch } = useContext(GlobalContext);
  return (
    <Container theme={state.theme}>
      <span>{name}</span>
      <TitleBarButton
        button={buttonType}
        onClick={onClose}
        theme={state.theme}
      />
    </Container>
  );
};

const Container = styled.div`
  ${(props) => {
    switch (props.theme) {
      case Themes.WINDOWS95:
        return windows95Theme.Bar;
      case Themes.DEFAULT:
        return defaultTheme.Bar;
      default:
        return null;
    }
  }}
`;

export default WindowBar;
