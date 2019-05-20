import React from 'react';

import styled from 'styled-components';

import Store from './Store';

const Container = styled.div`
  background-color: #008282;
  height: 100%;

  padding: 1em;
`;

const Desktop: React.FC = () => (
  <Container>
    <Store/>
  </Container>
);

export default Desktop;
