import React from 'react';
import styled from 'styled-components';
import TitleBarButton, { ButtonType } from './TitleBarButton';

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

interface WindowBarProps {
  name: string;
  onClose?: () => void;
}

const WindowBar: React.FC<WindowBarProps> = ({ name, onClose }) => (
    <Container>
        <span>{name}</span>
        <TitleBarButton button={ButtonType.close} onClick={onClose} />
    </Container>
);

export default WindowBar;