import React from 'react';

import styled from 'styled-components';

import TitleBar from './TitleBar';

const Container = styled.div`
  background: #c3c3c3;

  border-top: 4px solid #eee;
  border-left: 4px solid #eee;

  border-right: 2px solid #c3c3c3;
  border-bottom: 2px solid #c3c3c3;

  box-shadow: 1px 1px 0 1px black;

  display: grid;
  grid-template-columns: repeat(12, 8.25%);

  padding: 0.5em;

  height: 100%;
`;

const Window: React.FC<{className?: string}> = props => (
  <Container className={props.className}>
    <TitleBar name="Nibble95" />
    {props.children}
  </Container>
);

export default Window;
