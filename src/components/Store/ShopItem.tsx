import React, { FC } from 'react';
import styled from 'styled-components';
import { IMAGE_URI } from '../../artillery/API';
import { StoreObject } from '../../types/StoreObject';

type ShopWindowItemProps = {
  storeObject: StoreObject
  addItem: (id: number) => void
}

const ShopWindowItem: FC<ShopWindowItemProps> = ({ storeObject, addItem }) => {
    const addToCart = () => addItem(storeObject.pk);
    const imageSrc = storeObject.image ? IMAGE_URI(storeObject.image.sm) : '';
    return (
        <ShopItem key={storeObject.pk} onClick={addToCart}>
            <div>
                <img src={imageSrc} alt={storeObject.name} />
                <hr />
                <h3>{storeObject.name}</h3>
                <p>{`${storeObject.price} NOK`}</p>
            </div>
        </ShopItem>
    );
};

const ShopItem = styled.button`
  width: calc(100% / 3 - 2em);
  margin: 1em;
  float: left;
  padding: 5px;
  outline: 0;
  font-size: 0.8em;

  background: #c3c3c3;

  border-left: 2px solid white;
  border-top: 2px solid white;
  border-right: 2px solid #929292;
  border-bottom: 2px solid #929292;

  box-shadow: 1px 1px 0 1px black;

  img {
    width: 100px;
    height: 125px;
    margin: auto;
    display: block;
  }

  hr {
    border-top: 1px solid #929292;
    border-bottom: 1px solid white;
  }

  h3 {
    margin-bottom: 0;
    text-align: center;
    font-size: 1.3em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    margin: 3px 0 5px 0;
    font-size: 1.3em;
  }

  &:active {
    box-shadow: 2px 2px 0px 4px;
  }

  &:focus > div {
    border: 2px dotted black;
    margin: -0.6em;
    padding: calc(0.6em - 2px);
  }
`;

export default ShopWindowItem;
