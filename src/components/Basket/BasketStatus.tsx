import React, { FC } from 'react';
import styled from 'styled-components';

type BasketStatusProps = {
  cartSize: number
  total: number;
}

const BasketStatus: FC<BasketStatusProps> = ({ cartSize, total }) => {
    const cartImageUri = cartSize ? 'food' : 'nofood';

    return (
        <h3>
            <img
                src={`${process.env.PUBLIC_URL}/${cartImageUri}.png`}
                alt="Empty folder"
            />
            Basket
            <TotalDisplay total={total}>({total} NOK)</TotalDisplay>
        </h3>
    );
};

const TotalDisplay = styled.span<{ total: number }>`
  display: ${(props) => (props.total > 0 ? 'inline' : 'none')};
`;

export default BasketStatus;
