import React, { useContext, FC } from "react";
import styled from "styled-components";
import { calculateCartTotal } from "../../types/StoreObject";
import BasketItem from "./BasketItem";
import purchaseItems from "../../artillery/order";
import { GlobalContext, Themes } from "../../state/globalState";
import BasketStatus from "./BasketStatus";
import { dispatchPurchaseItems } from "../../state/actions";
import * as windows95Theme from "./themes/windows95";
import * as defaultTheme from "./themes/default";

const Basket: FC = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { user, cart } = state;
  const totalPrice = calculateCartTotal(cart, state.inventory);

  const balance = user ? user.balance : 0;
  const isDisabled = state.user == null || balance < totalPrice;
  const fundsText = isDisabled ? "INSUFFICIENT" : "PURCHASE";

  const purchase = async () => {
    if (user) {
      const response = await purchaseItems(user.pk, cart);
      if (response.ok) dispatchPurchaseItems(dispatch, totalPrice);
    }
  };

  return (
    <Container theme={state.theme}>
      <BasketStatus cartSize={Object.keys(cart).length} total={totalPrice} />
      <BasketItemContainer theme={state.theme}>
        {Object.keys(cart).map((key: string) => (
          <BasketItem
            key={key}
            id={Number(key)}
            quantity={cart[Number(key)].quantity}
            theme={state.theme}
          />
        ))}
      </BasketItemContainer>
      <hr />
      <PurchaseButton
        onClick={purchase}
        disabled={isDisabled}
        theme={state.theme}
      >
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
  ${(props) => {
    switch (props.theme) {
      case Themes.WINDOWS95:
        return windows95Theme.Container;
      case Themes.DEFAULT:
        return null;
      default:
        return null;
    }
  }}
`;

const PurchaseButton = styled.button`
  ${(props) => {
    switch (props.theme) {
      case Themes.WINDOWS95:
        return windows95Theme.Purchase;
      case Themes.DEFAULT:
        return null;
      default:
        return null;
    }
  }}
`;

const BasketItemContainer = styled.div`
  overflow-y: auto;
`;

export default Basket;
