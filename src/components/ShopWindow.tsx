import React from 'react';

import styled, { css } from 'styled-components';

import { StoreObject } from './../types/StoreObject';
import { StoreCtx } from './App';

import Window from './Window';

const Container = styled.div`
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAMklEQVQoU2P8/5//PwMYfIBQaICRCAX/oSZgNYCB8f9/khUIQI2CuAmLCQQVoLqFoBsA13oh6VgfNmcAAAAASUVORK5CYII=) repeat;

  border-top: 2px solid #898989;
  border-left: 2px solid #898989;

  box-shadow: 1px 1px 0 1px white;

  grid-column: 1 / span 9;
  grid-row: 3;

  overflow-y: scroll;
`;

const WindowItem = styled.button`
  width: calc(100%/3 - 2em);
  margin: 1em;
  float: left;
  padding: 15px;
  outline: 0;

  background: #c3c3c3;

  border-left: 2px solid white;
  border-top: 2px solid white;
  border-right: 2px solid #929292;
  border-bottom: 2px solid #929292;

  box-shadow: 1px 1px 0 1px black;

  img {
    width: 126px;
    height: 151px;
    margin: auto;
    display: block;
  }

  hr {
    border-top: 1px solid #929292;
    border-bottom: 1px solid white;
  }

  h3 {
    margin-bottom: 0;
    text-align: center;
    font-size: 1.3em;
  }

  p {
    margin: 3 0 5px 0;
  }

  &:active {
    box-shadow: 2px 2px 0px 4px;
  }

  &:focus>div {
      border: 2px dotted black;
      margin: -.6em;
      padding: calc(.6em - 2px);
  }
`;

const ShopWindowItem: React.FC<StoreObject> = (so: StoreObject) => (
  <WindowItem key={so.pk}>
    <div>
      <img src={so.image ? `https://online.ntnu.no/${so.image.sm}` : ''} alt={so.name} />
      <hr />
      <h3>{so.name}</h3>
      <p>{so.price} NOK</p>
    </div>
  </WindowItem>
);

const ShopWindow: React.FC = () => {
  const store = React.useContext(StoreCtx);

  return (
    <Container>
      {store.length == 0 ? "Loading..." : store.map(ShopWindowItem)}
    </Container>
  );
};

export default ShopWindow;
