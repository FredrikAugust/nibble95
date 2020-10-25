import React, { FC, useContext } from "react";
import styled, { css } from "styled-components";
import { ApplicationWindowTypes } from "../state/applicationWindowState";
import * as windows95Theme from "./themes/windows95";
import * as defaultTheme from "./themes/default";
import { Themes, GlobalContext } from "../state/globalState";

export type ButtonProps = {
  icon?: string;
  text: string;
  className?: string;
  isApplication?: boolean;
  activity?: ApplicationWindowTypes;
  onClick: Function;
};

const Icon = styled.img`
  height: 1em;
  width: 1em;
  margin-right: 0.3em;
`;

const Button: FC<ButtonProps> = ({
  text,
  className,
  icon,
  onClick,
}: ButtonProps) => {
  const { state } = useContext(GlobalContext);
  return (
    <Knapp
      className={className}
      onClick={() => onClick()}
      type="button"
      theme={state.theme}
    >
      {icon ? <Icon src={icon} alt="Windows 95 Logo" /> : ""}
      {text}
    </Knapp>
  );
};

const Knapp = styled.button`
  ${(props) => {
    switch (props.theme) {
      case Themes.WINDOWS95:
        return windows95Theme.Button;
      case Themes.DEFAULT:
        return defaultTheme.Button;
      default:
        return null;
    }
  }}
`;

export default Button;
