import React from 'react';

import styled, { css } from 'styled-components';

import Window from './Window';
import ShopWindow from './ShopWindow';

const Basket = styled.div`
  grid-column: 9 / span 5;
  grid-row: 3;
`;

const Store: React.FC<{ className?: string }> = ({ className }) => (
  <Window className={className}>
    <h1>Welcome to <strong>Nibble</strong><span>95</span></h1>
    <ShopWindow></ShopWindow>
    <Basket></Basket>
  </Window>
);

export default styled(Store)`
  h1 {
    padding: 0;
    margin: 0;

    font-weight: 600;
    font-family: serif;

    grid-column: 1 / span 13;
    grid-row: 2;

    strong {
      font-weight: 800;
    }

    span {
      color: white;
      font-weight: 100;
      font-size: 1.2em;
    }
  }
`;
