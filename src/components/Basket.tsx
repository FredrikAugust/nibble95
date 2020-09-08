import React, { useContext, FC } from 'react';
import styled from 'styled-components';
import { StoreObject } from '../types/StoreObject';
import BasketItem from './atom/BasketItem';
import purchaseItems from '../artillery/order';
import {
    GlobalContext,
    dispatchPurchaseItems,
} from '../state/globalState';
import Button from './atom/Button';

const Basket: FC = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const { user, cart } = state;
    const totalPrice = Object.keys(cart).reduce(
        (prev: number, so: string) => {
            const item = (state.inventory.find((e) => e.pk === Number(so))! as StoreObject);
            return prev + item.price * cart[Number(so)].quantity;
        },
        0,
    );

    const balance = user ? user.balance : 0;
    const fundsImageUri = balance >= totalPrice ? 'purchase' : 'insufficient';
    const fundsText = balance >= totalPrice ? 'PURCHASE' : 'INSUFFICIENT';
    const cartImageUri = Math.max(Object.keys(cart).length) > 0 ? 'food' : 'nofood';

    const userId = user ? user.pk : -1;
    const dispatchWithdraw = () => dispatchPurchaseItems(dispatch, totalPrice);
    const purchase = async () => {
        const response = await purchaseItems(userId, cart);
        if (response.ok) dispatchWithdraw();
    };

    const refresh = () => window.location.reload();

    return (
        <Container>
            <Button className="refresh-window" text="Refresh window" onClick={refresh} />
            <h3>
                <img
                    src={`${process.env.PUBLIC_URL}/${cartImageUri}.png`}
                    alt="Empty folder"
                />
                Basket
                <span style={{ display: totalPrice > 0 ? 'inline' : 'none' }}>
                    ({totalPrice} NOK)
                </span>
            </h3>
            <BasketItemContainer>
                {Object.keys(cart).map((key: string) => (
                    <BasketItem
                        key={key}
                        id={Number(key)}
                        quantity={cart[Number(key)].quantity}
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
  grid-template-rows: 2.3em 2.3em 79% 2px;

  grid-row-gap: 5px;

  .refresh-window {
    grid-row: 1;
  }

  hr {
    border-top: 1px solid #929292;
    border-bottom: 1px solid white;

    grid-row: 4;

    margin: 0;
    padding: 0;
  }

  h3 {
    grid-row: 2;
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
    grid-row: 3 / span 1;

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

  grid-row: 5;

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
  grid-row: 3;
  overflow-y: auto;
`;

export default Basket;
