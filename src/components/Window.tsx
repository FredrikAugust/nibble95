import React from 'react';

import styled, { css } from 'styled-components';

import TitleBar from './TitleBar';

const Container = styled.div`
  background: #c3c3c3;

  border-top: 4px solid #eee;
  border-left: 4px solid #eee;

  border-right: 2px solid #c3c3c3;
  border-bottom: 2px solid #c3c3c3;

  box-shadow: 1px 1px 0 1px black;

  display: flex;
  flex-direction: column;

  flex-grow: 1;

  margin: 1em;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Window: React.FC = props => (
  <Container>
    <TitleBar name="Nibble95" />
    <Content>{props.children}</Content>
  </Container>
);

export default Window;
