import React, { useContext, FC } from 'react';
import styled from 'styled-components';
import { calculateCartTotal } from '../../types/StoreObject';
import BasketItem from './BasketItem';
import purchaseItems from '../../artillery/order';
import { GlobalContext } from '../../state/globalState';
import BasketStatus from './BasketStatus';
import { dispatchPurchaseItems } from '../../state/actions';

const Basket: FC = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const { user, cart } = state;
    const totalPrice = calculateCartTotal(cart, state.inventory);

    const balance = user ? user.balance : 0;
    const isDisabled = state.user == null || balance < totalPrice;
    const fundsText = isDisabled ? 'INSUFFICIENT' : 'PURCHASE';

    const purchase = async () => {
        if (user) {
            const response = await purchaseItems(user.pk, cart);
            if (response.ok) dispatchPurchaseItems(dispatch, totalPrice);
        }
    };

    return (
        <Container>
            <BasketStatus cartSize={Object.keys(cart).length} total={totalPrice} />
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
            <PurchaseButton onClick={purchase} disabled={isDisabled}>
                <img
                    src={`${process.env.PUBLIC_URL}/${fundsText.toUpperCase()}.png`}
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
  grid-template-rows: min-content auto 2px min-content;

  grid-row-gap: 5px;

  hr {
    border-top: 1px solid #929292;
    border-bottom: 1px solid white;

    margin: 0;
    padding: 0;
  }

  h3 {
    margin: 0;
    font-weight: 100;
    font-size: 1.2em;

    img {
      vertical-align: middle;
      margin-right: 0.3em;
    }

    span {
      font-weight: 100;
    }
  }

  & > div:nth-child(2) {

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

  color: white;

  font-size: 1em;
  padding: 1rem;
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
