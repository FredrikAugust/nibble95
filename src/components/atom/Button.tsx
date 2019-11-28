import React from "react";

import styled, { css } from "styled-components";

export interface ButtonProps {
  icon?: string;
  text: string;
  className?: string;
  application?: boolean;
  pressed?: boolean;
  onClick: Function;
}

const Icon = styled.img`
  height: 1em;
  width: 1em;

  margin-right: 0.3em;
`;

const Button: React.FC<ButtonProps> = ({ text, className, icon, onClick }) => (
  <button className={className} onClick={() => onClick()}>
    {icon ? <Icon src={icon} alt="Windows 95 Logo" /> : ""}
    {text}
  </button>
);

export default styled(Button)`
  background-color: #C3C3C3;

  box-shadow: 1px 1px 0 1px black;
  font-weight: 400;
  text-align: left;
  font-size: 1.4em;
  letter-spacing: -1px;
  height: 33px;

  *, & { /* All children and itself */
    vertical-align: middle;
  }

  padding: 0 5px;

  border-right: 1px solid #c3c3c3;
  border-bottom: 1px solid #c3c3c3;
  border-top: 2px solid white;
  border-left: 2px solid white;
  outline: none;

  /* If it is an "application" */
  ${(props: ButtonProps) =>
    props.application
      ? css`
          width: 10em;
        `
      : null}

  /* If it is active */
  ${(props: ButtonProps) =>
    props.pressed
      ? css`
          border-top: 1px solid #c3c3c3;
          border-left: 1px solid #c3c3c3;
          border-bottom: 2px solid white;
          border-right: 2px solid white;

          margin-top: -1px;
          height: 36px;

          box-shadow: 1px 1px 1px 1px black inset;

          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJ0lEQVQYV2N88ODBfwYGBgZ5eXkQxcCIIfD//3+wiocPH0JUoAsAAMp5FTuPL92NAAAAAElFTkSuQmCC)
            repeat;
        `
      : null}

  &:not(:last-of-type) {
    margin-right: .3em;
  }
`;
