import React from 'react';

import styled, { css } from 'styled-components';

import Window from './Window';
import ShopWindow from './ShopWindow';

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;

  padding: 1em;

  h1 {
    padding: 0;
    margin: 0;
    font-weight: 600;
    font-family: serif;

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

const Shop = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const Basket = styled.div``;

const Store: React.FC = () => (
  <Window>
    <Container>
      <h1>Welcome to <strong>Nibble</strong><span>95</span></h1>
      <Shop>
        <ShopWindow></ShopWindow>
        <Basket></Basket>
      </Shop>
    </Container>
  </Window>
);

export default Store;
