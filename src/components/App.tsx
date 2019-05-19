import React from 'react';

import styled from 'styled-components';

import StartBar from './StartBar'
import Desktop from './Desktop'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const App: React.FC = () => {
  return (
    <Container>
      <Desktop />
      <StartBar />
    </Container>
  );
}

export default App;
