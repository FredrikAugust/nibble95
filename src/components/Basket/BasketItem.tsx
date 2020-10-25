import React, { FC, useContext } from "react";
import styled from "styled-components";
import { StoreObject } from "../../types/StoreObject";
import { GlobalContext, Themes } from "../../state/globalState";
import { removeFromCart } from "../../state/actions";
import * as windows95Theme from "./themes/windows95";
import * as defaultTheme from "./themes/default";
type BasketItemProps = {
  className?: string;
  id: number;
  quantity: number;
  theme: Themes;
};

const BasketItem: FC<BasketItemProps> = ({
  className,
  id,
  quantity,
  theme,
}: BasketItemProps) => {
  const { state, dispatch } = useContext(GlobalContext);
  const removeItem = () => dispatch(removeFromCart(id));

  if (!quantity) return null;

  const item: StoreObject = state.inventory.find((e) => e.pk === id)!;

  return (
    <div role="button" className={className} onClick={removeItem} tabIndex={0}>
      <div>
        <h3>{item.name}</h3>
        <h5>x {quantity}</h5>
      </div>
      <h5>
        {item.price * quantity}
        <span>NOK</span>
      </h5>
    </div>
  );
};

export default styled(BasketItem)`
  ${(props) => {
    switch (props.theme) {
      case Themes.WINDOWS95:
        return windows95Theme.Item;
      case Themes.DEFAULT:
        return defaultTheme.Item;
      default:
        return null;
    }
  }}
`;
