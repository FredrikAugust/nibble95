import React from 'react';
import styled from 'styled-components';
import TitleBarButton, { TitleBarButtonType as ButtonType } from './TitleBarButton';

type WindowBarProps = {
  name: string
  onClose?: () => void
  buttonType: ButtonType
}

const WindowBar: React.FC<WindowBarProps> = ({ name, onClose, buttonType }) => (
    <Container>
        <span>{name}</span>
        <TitleBarButton button={buttonType} onClick={onClose} />
    </Container>
);

const Container = styled.div`
  height: 1.6em;
  font-size: 1.1em;
  background-color: #000082;
  color: white;
  padding: 3px 3px 2px 6px;

  margin: -0.5em; /* Counteract the padding from window */

  display: flex;
  justify-content: space-between;

  span {
    line-height: 1.3em;
  }

  grid-column: 1 / span 13;
  grid-row: 1;
`;

export default WindowBar;
