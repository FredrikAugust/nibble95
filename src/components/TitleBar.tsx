import React from 'react';

import styled, { css } from 'styled-components';

import TitleBarButton, { ButtonType } from './atom/TitleBarButton';

const Container = styled.div`
  width: 100%;
  height: 1.6em;
  font-size: 1.1em;
  background-color: #000082;
  color: white;
  padding: 3px 3px 2px 6px;

  display: flex;
  justify-content: space-between;

  span {
    line-height: 1.3em;
  }
`;

interface TitleBarProps {
  name: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ name }) => (
  <Container>
    <span>{name}</span>
    <TitleBarButton button={ButtonType.close} />
  </Container>
);

export default TitleBar;
