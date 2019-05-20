import React from 'react';

import styled, { css } from 'styled-components';

import Window from './Window';
import ShopWindow from './ShopWindow';
import Basket from './Basket';

const Store: React.FC<{ className?: string }> = ({ className }) => (
  <Window className={className}>
    <h1>
      <img src={`${process.env.PUBLIC_URL}/logo.png`} />
      Welcome to <strong>Nibble</strong><span>95</span>
    </h1>
    <ShopWindow></ShopWindow>
    <Basket balance={0} items={[]}></Basket>
  </Window>
);

export default styled(Store)`
  h1 {
    padding: 0;
    padding-top: .2em;
    margin: 0;

    font-size: 2.2em;

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

    img {
      margin-right: .3em;
      vertical-align: middle;
      margin-top: -10px;
    }
  }
`;
