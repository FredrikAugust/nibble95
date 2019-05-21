import React, { Dispatch } from 'react';

import styled from 'styled-components';

import { StoreObject } from './../types/StoreObject';
import { State, Action } from './../reducers/basket';

import BasketItem from './atom/BasketItem';
import { StoreCtx } from './App';

const Container = styled.div`
  overflow: hidden;
  grid-column: 10 / span 3;
  grid-row: 3;
  padding-left: 1em;

  display: grid;

  grid-template-columns: 100%;
  grid-template-rows: 2.3em 79% 2px auto;

  grid-row-gap: 5px;

  hr {
    border-top: 1px solid #929292;
    border-bottom: 1px solid white;

    grid-row: 3;

    margin: 0;
    padding: 0;
  }

  h3 {
    grid-row: 1;
    margin: 0;
    font-weight: 100;

    img {
      vertical-align: middle;
      margin-right: .3em;
    }

    span {
      font-weight: 100;
      font-size: 0.9em;
    }
  }

  &>div:nth-child(2) {
    grid-row: 2 / span 1;

    border-top: 1px solid #828282;
    border-left: 1px solid #828282;
    border-right: 1px solid white;
    border-bottom: 1px solid white;

    padding: 5px;
  }
`;

interface BasketProps {
  balance: number;
  basket: State;
  dispatch: Dispatch<Action>;
}

const PurchaseButton = styled.button`
  background-color: #008282;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-bottom: 1px solid #929292;
  border-right: 1px solid #929292;
  box-shadow: 1px 1px 0 1px black;
  margin: 1px 3px 3px 1px;

  grid-row: 4;

  color: white;

  font-size: 1.7em;
  text-align: left;

  img {
    margin-right: .3em;
    vertical-align: middle;
    height: .9em;
    margin-top: -5px;
    margin-left: .1em;
  }

  outline: 0;

  &:active {
    box-shadow: 3px 3px 0 4px black;
  }

  font-weight: 100;
`;

const BasketItemContainer = styled.div`
  overflow-y: auto;
`;

const Basket: React.FC<BasketProps> = props => {
  const store = React.useContext(StoreCtx);

  const totalPrice = Object.keys(props.basket).reduce((prev: number, so: string) => {
    const p = (store.find(e => e.pk === Number(so))! as StoreObject).price;
    return prev + p*props.basket[Number(so)];
  }, 0);

  return (
    <Container>
      <h3>
        <img src={`${process.env.PUBLIC_URL}/${Math.max(...Object.values(props.basket)) > 0 ? 'food' : 'nofood'}.png`} alt="Empty folder" />
        Basket <span style={{display: totalPrice > 0 ? "inline" : "none"}}>({ totalPrice }NOK)</span>
      </h3>
      <BasketItemContainer>
        {Object.keys(props.basket).map((e: string) => <BasketItem id={Number(e)} quantity={props.basket[Number(e)]} dispatch={props.dispatch} />)}
      </BasketItemContainer>
      <hr />
      <PurchaseButton>
        <img src={`${process.env.PUBLIC_URL}/${props.balance >= 0 ? 'purchase' : 'insufficient'}.png`} alt="Money or no money" />
        Purchase
      </PurchaseButton>
    </Container>
  );
};

export default Basket;
