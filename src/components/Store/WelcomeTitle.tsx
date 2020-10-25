import React, { FC } from "react";
import styled from "styled-components";
import { Themes } from "../../state/globalState";
import { User } from "../../types/User";

import * as windows95Theme from "./themes/windows95";
import * as defaultTheme from "./themes/default";

type WelcomeTitleProps = {
  user: User | null | undefined;
  theme: Themes;
};

const WelcomeTitle: FC<WelcomeTitleProps> = ({ user, theme }) => {
  const username = user?.first_name || "";
  return (
    <Component theme={theme}>
      <img
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="Nibble Logo (Windows 95 Search Computer Icon)"
      />
      Weclome to &nbsp;
      <strong>Nibble</strong>
      <span>95</span>
      {user ? `, ${username}` : null}
    </Component>
  );
};

const Component = styled.h1`
  ${(props) => {
    switch (props.theme) {
      case Themes.WINDOWS95:
        return windows95Theme.Title;
      case Themes.DEFAULT:
        return null;
      default:
        return null;
    }
  }}
`;

export default WelcomeTitle;
