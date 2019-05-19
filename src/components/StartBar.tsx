import React from 'react';

import styled from 'styled-components';

import Button from './atom/Button';

const Container = styled.div`
  background-color: #C3C3C3;
  padding: 3px 3px 5px 3px;
  border-top: 1px solid white;
  box-shadow: 0px 0px 1px 1px #e8e8e8;
  display: flex;
`;

const StartBar: React.FC = () => (
  <Container>
    <Button text="Start" icon={`${process.env.PUBLIC_URL}/start.png`} />
    <Button text="Nibble95" application={true} pressed={true} />
  </Container>
);

export default StartBar;
