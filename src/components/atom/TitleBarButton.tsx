import React from 'react';

import styled from 'styled-components';

enum ButtonType {
  minimize,
  maximize,
  close
}

interface TitleBarButtonProps {
  button: ButtonType;
  className?: string;
  onClick?: () => void;
}

const TitleBarButton: React.FC<TitleBarButtonProps> = ({
    button,
    className,
    onClick
}) => {
    switch (button) {
        case ButtonType.minimize:
            return <button className={className}>_</button>;
        case ButtonType.maximize:
            return <button className={className}>&#x274f;</button>;
        case ButtonType.close:
            return <button className={className} onClick={onClick}>X</button>;
    }
};

export { ButtonType };

export default styled(TitleBarButton)`
  padding: 0 1px;
  font-size: 0.9em;
  line-height: 1em;
  height: 1.15em;
  width: 1.15em;
  margin-right: 2px;
  margin-top: 1px;
  outline: none;
  background-color: #c3c3c3;
  font-weight: 600;

  border-top: 2px solid white;
  border-left: 2px solid white;

  box-shadow: 1px 1px 0 1px black;
`;
