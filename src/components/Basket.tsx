import React, { Dispatch, useContext, FC } from 'react';
import styled from 'styled-components';
import { Action, State } from '../reducers/basket';
import { StoreObject } from '../types/StoreObject';
import BasketItem from './atom/BasketItem';
import purchaseItems from '../artillery/store';
import { GlobalContext, GlobalActionTypes } from '../globalState';

interface BasketProps {
  basket: State;
  basketDispatch: Dispatch<Action>;
}

const Basket: FC<BasketProps> = ({ basket, basketDispatch }: BasketProps) => {
    const { state, dispatch } = useContext(GlobalContext);
    const { user } = state;
    const totalPrice = Object.keys(basket).reduce(
        (prev: number, so: string) => {
            const p = (state.items.find((e) => e.pk === Number(so))! as StoreObject);
            return prev + p.price * basket[Number(so)];
        },
        0,
    );

    const balance = user ? user.balance : 0;
    const fundsImageUri = balance >= totalPrice ? 'purchase' : 'insufficient';
    const fundsText = balance >= totalPrice ? 'PURCHASE' : 'INSUFFICIENT';
    const cartImageUri = Math.max(...Object.values(basket)) > 0 ? 'food' : 'nofood';

    const userId = user ? user.pk : -1;
    const withdrawBalance = () => (
        dispatch({ type: GlobalActionTypes.WITHDRAW_BALANCE, payload: totalPrice })
    );
    const flatBasket = Object.entries(basket).flatMap((entry) => Array(entry[1]).fill(Number(entry[0])));
    const purchase = () => purchaseItems(userId, flatBasket).then(() => withdrawBalance);

    return (
        <Container>
            <h3>
                <img
                    src={`${process.env.PUBLIC_URL}/${cartImageUri}.png`}
                    alt="Empty folder"
                />
                Basket
                <span style={{ display: totalPrice > 0 ? 'inline' : 'none' }}>
                    {`(${totalPrice} NOK)`}
                </span>
            </h3>
            <BasketItemContainer>
                {Object.keys(basket).map((e: string) => (
                    <BasketItem
                        key={e}
                        id={Number(e)}
                        quantity={basket[Number(e)]}
                        dispatch={basketDispatch}
                    />
                ))}
            </BasketItemContainer>
            <hr />
            <PurchaseButton
                onClick={purchase}
                disabled={balance < totalPrice}
            >
                <img
                    src={`${process.env.PUBLIC_URL}/${fundsImageUri}.png`}
                    alt="Money or no money"
                />
                {fundsText}
            </PurchaseButton>
        </Container>
    );
};

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
      margin-right: 0.3em;
    }

    span {
      font-weight: 100;
      font-size: 0.9em;
    }
  }

  & > div:nth-child(2) {
    grid-row: 2 / span 1;

    border-top: 1px solid #828282;
    border-left: 1px solid #828282;
    border-right: 1px solid white;
    border-bottom: 1px solid white;

    padding: 5px;
  }
`;

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
    margin-right: 0.3em;
    vertical-align: middle;
    height: 0.9em;
    margin-top: -5px;
    margin-left: 0.1em;
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

export default Basket;
