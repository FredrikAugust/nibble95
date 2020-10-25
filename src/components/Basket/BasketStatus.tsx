import React, { FC, useContext } from "react";
import styled from "styled-components";
import { GlobalContext, Themes } from "../../state/globalState";

type BasketStatusProps = {
  cartSize: number;
  total: number;
  theme: Themes;
};

const BasketStatus: FC<BasketStatusProps> = ({ cartSize, total, theme }) => {
  const cartImageUri = cartSize ? "food" : "nofood";
  const { state, dispatch } = useContext(GlobalContext);
  return (
    <h3>
      <img
        src={`${process.env.PUBLIC_URL}/images/themes/${theme}/${cartImageUri}.png`}
        alt="Empty folder"
      />
      Basket
      <TotalDisplay total={total}>({total} NOK)</TotalDisplay>
    </h3>
  );
};

const TotalDisplay = styled.span<{ total: number }>`
  display: ${(props) => (props.total > 0 ? "inline" : "none")};
`;

export default BasketStatus;
