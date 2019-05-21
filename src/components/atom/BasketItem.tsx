import React, { Dispatch } from 'react';
import styled from 'styled-components';
import { StoreCtx } from '../App';
import { StoreObject } from '../../types/StoreObject';
import { Action, remove } from '../../reducers/basket';

interface BasketItemProps {
  className?: string;
  id: number;
  quantity: number;
  dispatch: Dispatch<Action>;
}

const BasketItem: React.FC<BasketItemProps> = ({ className, id, quantity, dispatch }) => {
  const store = React.useContext(StoreCtx);

  if (!quantity) return null;  

  const item: StoreObject = store.find(e => e.pk === id)!;

  return (
    <div className={className} onClick={() => dispatch(remove(item))}>
      <div>
        <h3>{item.name}</h3>
        <h5>x{quantity}</h5>
      </div>
      <h5>{item.price * quantity}<span>NOK</span></h5>
    </div>
  );
};

export default styled(BasketItem)`
  h3, h5 {
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

  &>h5 {
    margin-left: auto;
    align-self: center;

    font-weight: 100;

    font-size: 1.25em;
    color: #000082;

    span {
      color: black;
    }
  }
`;