import React, { FC } from 'react';
import styled from 'styled-components';
import { IMAGE_URI } from '../../artillery/API';
import { Themes } from '../../state/globalState';
import { StoreObject } from '../../types/StoreObject';

import * as windows95Theme from './themes/windows95';
import * as defaultTheme from './themes/default';

type ShopWindowItemProps = {
  storeObject: StoreObject
  addItem: (id: number) => void
  theme: Themes
}

const ShopWindowItem: FC<ShopWindowItemProps> = ({ storeObject, addItem, theme }) => {
    const addToCart = () => addItem(storeObject.pk);
    const imageSrc = storeObject.image ? IMAGE_URI(storeObject.image.sm) : '';
    return (
        <ShopItem theme={theme} key={storeObject.pk} onClick={addToCart}>
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
    ${(props) => {
        switch (props.theme) {
            case Themes.WINDOWS95: return windows95Theme.ShopItem;
            case Themes.DEFAULT: return defaultTheme.ShopItem;
            default: return null;
        }
    }}
`;

export default ShopWindowItem;
