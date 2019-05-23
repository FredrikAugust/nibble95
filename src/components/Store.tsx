import React from 'react';

import styled from 'styled-components';

import { reducer } from './../reducers/basket';

import Window from './Window';
import ShopWindow from './ShopWindow';
import Basket from './Basket';

const Store: React.FC<{ className?: string }> = ({ className }) => {
  const [state, dispatch] = React.useReducer(reducer, {});

  return (
    <Window className={className}>
      <h1>
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Nibble Logo (Windows 95 Search Computer Icon)" />
        Welcome to <strong>Nibble</strong><span>95</span>
      </h1>
      <ShopWindow dispatch={dispatch} />
      <Basket dispatch={dispatch} balance={0} basket={state}></Basket>
    </Window>
  );
};

export default styled(Store)`
  h1 {
    padding: 0;
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

  grid-template-rows: 1.6em 3.2em auto;
`;
