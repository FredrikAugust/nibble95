import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { addToCart } from '../../state/actions';
import { GlobalContext, Themes } from '../../state/globalState';
import { StoreObject } from '../../types/StoreObject';
import ShopWindowItem from './ShopItem';

import * as windows95Theme from './themes/windows95';
import * as defaultTheme from './themes/default';

type ShopWindowProps = {
  inventory: StoreObject[]
}

const ShopWindow: FC<ShopWindowProps> = ({ inventory }) => {
    const { state, dispatch } = useContext(GlobalContext);
    const addItem = (id: number) => dispatch(addToCart(id));
    const shopItems = inventory.map((item) => (
        <ShopWindowItem
            key={item.pk}
            storeObject={item}
            addItem={addItem}
            theme={state.theme}
        />
    ));
    return (
        <Container theme={state.theme}>
            {inventory.length === 0 ? 'Loading...' : shopItems}
        </Container>
    );
};

export default ShopWindow;

const Container = styled.div`
    ${(props) => {
        switch (props.theme) {
            case Themes.WINDOWS95: return windows95Theme.ShopWindow;
            case Themes.DEFAULT: return defaultTheme.ShopWindow;
            default: return null;
        }
    }}
`;
