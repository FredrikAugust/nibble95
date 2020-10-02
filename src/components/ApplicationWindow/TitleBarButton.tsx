import React, { FC } from 'react';
import styled from 'styled-components';

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
}

const TitleBarButton: FC<TitleBarButtonProps> = ({
    button,
    className,
    onClick,
}: TitleBarButtonProps) => {
    switch (button) {
        case TitleBarButtonType.minimize:
            return <button type="button" className={className}>_</button>;
        case TitleBarButtonType.maximize:
            return <button type="button" className={className}>&#x274f;</button>;
        case TitleBarButtonType.close:
            return <button type="button" className={className} onClick={onClick}>X</button>;
        case TitleBarButtonType.logout:
            return <button type="button" className={className} onClick={onClick}>Sign out</button>;
        default:
            return null;
    }
};

export default styled(TitleBarButton)`
  padding: 0 1px;
  font-size: 0.9em;
  line-height: 1em;
  min-height: 1.15em;
  min-width: 1.15em;
  margin-right: 2px;
  margin-top: 1px;
  outline: none;
  background-color: #c3c3c3;
  font-weight: 600;

  border-top: 2px solid white;
  border-left: 2px solid white;

  box-shadow: 1px 1px 0 1px black;
`;
