import React, { useContext } from 'react';
import styled from 'styled-components';
import { StoreObject } from '../../types/StoreObject';
import { GlobalContext, removeFromCart } from '../../state/globalState';

interface BasketItemProps {
  className?: string;
  id: number;
  quantity: number;
}

const BasketItem: React.FC<BasketItemProps> = ({ className, id, quantity }: BasketItemProps) => {
    const { state, dispatch } = useContext(GlobalContext);
    const removeItem = () => dispatch(removeFromCart(id));

    if (!quantity) return null;

    const item: StoreObject = state.inventory.find((e) => e.pk === id)!;

    return (
        <div
            role="button"
            className={className}
            onClick={removeItem}
            tabIndex={0}
        >
            <div>
                <h3>{item.name}</h3>
                <h5>
x
                    {quantity}
                </h5>
            </div>
            <h5>
                {item.price * quantity}
                <span>NOK</span>
            </h5>
        </div>
    );
};

export default styled(BasketItem)`
  font-size: 0.9em;
  h3,
  h5 {
    margin: 0;
    padding: 0;
    font-weight: 100;
  }

  h5 {
    margin-bottom: 4px;
  }

  display: flex;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid #929292;
  border-bottom: 1px solid #929292;
  box-shadow: 1px 1px 0 1px black;
  padding: 3px;
  margin-bottom: 5px;

  & > h5 {
    margin-left: auto;
    align-self: center;

    font-weight: 100;

    font-size: 1em;
    color: #000082;

    span {
      color: black;
    }
  }
`;
