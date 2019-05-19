import React from 'react';

import styled from 'styled-components';

import Store from './Store';

const Container = styled.div`
  background-color: #008282;
  flex-grow: 1;

  display: flex;
`;

const Desktop: React.FC = () => (
  <Container>
    <Store/>
  </Container>
);

export default Desktop;
