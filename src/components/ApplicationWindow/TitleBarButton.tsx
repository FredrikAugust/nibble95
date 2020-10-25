import React, { FC } from "react";
import styled from "styled-components";
import { Themes, GlobalContext } from "../../state/globalState";

import * as windows95Theme from "./themes/windows95";
import * as defaultTheme from "./themes/default";
import { ApplicationWindowContext } from "../../state/applicationWindowState";

export enum TitleBarButtonType {
  minimize,
  maximize,
  close,
  logout,
}

type TitleBarButtonProps = {
  button: TitleBarButtonType;
  className?: string;
  onClick?: () => void;
  theme: Themes;
};

const TitleBarButton: FC<TitleBarButtonProps> = ({
  button,
  className,
  onClick,
  theme,
}: TitleBarButtonProps) => {
  switch (button) {
    case TitleBarButtonType.minimize:
      return (
        <button type="button" className={className}>
          _
        </button>
      );
    case TitleBarButtonType.maximize:
      return (
        <button type="button" className={className}>
          &#x274f;
        </button>
      );
    case TitleBarButtonType.close:
      return (
        <button type="button" className={className} onClick={onClick}>
          X
        </button>
      );
    case TitleBarButtonType.logout:
      return (
        <button type="button" className={className} onClick={onClick}>
          Sign out
        </button>
      );
    default:
      return null;
  }
};

export default styled(TitleBarButton)`
  ${(props) => {
    switch (props.theme) {
      case Themes.WINDOWS95:
        return windows95Theme.BarButton;
      case Themes.DEFAULT:
        return defaultTheme.BarButton;
      default:
        return null;
    }
  }}
`;
