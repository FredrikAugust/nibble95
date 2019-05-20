import React from 'react';

import styled from 'styled-components';

import { StoreObject } from './../types/StoreObject';

const Container = styled.div`
  grid-column: 10 / span 3;
  grid-row: 3;
  padding-left: 1em;

  display: grid;

  grid-template-columns: 100%;
  grid-template-rows: 2.3em 82% 2px auto;

  grid-row-gap: 5px;

  hr {
    border-top: 1px solid #929292;
    border-bottom: 1px solid white;

    grid-row: 2;

    margin: 0;
    pading: 0;
  }

  h3 {
    grid-row: 1;
    margin: 0;
    font-weight: 0;

    img {
      vertical-align: middle;
      margin-right: .3em;
    }
  }
`;

interface BasketProps {
  items: StoreObject[];
  balance: number;
}

const PurchaseButton = styled.button`
  background-color: #008282;
  border-top: 1px solid white;
  border-left: 1px solid white;
  box-shadow: 1px 1px 0 1px black;

  color: white;

  font-size: 2em;
  text-align: left;

  img {
    margin-right: .3em;
    vertical-align: middle;
    margin-top: -5px;
    margin-left: .1em;
  }

  font-weight: 100;
`;

const Basket: React.FC<BasketProps> = props => (
  <Container>
    <h3>
      <img src={`${process.env.PUBLIC_URL}/${props.items.length == 0 ? 'nofood' : 'food'}.png`} alt="Empty folder" />
      Basket
    </h3>
    <div>
    </div>
    <hr />
    <PurchaseButton>
      <img src={`${process.env.PUBLIC_URL}/${props.balance >= 0 ? 'purchase' : 'insufficient'}.png`} alt="Money or no money" />
      Purchase
    </PurchaseButton>
  </Container>
);

export default Basket;
