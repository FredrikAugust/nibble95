import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { addToCart } from '../../state/actions';
import { GlobalContext } from '../../state/globalState';
import { StoreObject } from '../../types/StoreObject';
import ShopWindowItem from './ShopItem';

type ShopWindowProps = {
  inventory: StoreObject[]
}

const ShopWindow: FC<ShopWindowProps> = ({ inventory }) => {
    const { dispatch } = useContext(GlobalContext);
    const addItem = (id: number) => dispatch(addToCart(id));
    const shopItems = inventory.map((item) => (
        <ShopWindowItem
            key={item.pk}
            storeObject={item}
            addItem={addItem}
        />
    ));
    return (
        <Container>
            {inventory.length === 0 ? 'Loading...' : shopItems}
        </Container>
    );
};

export default ShopWindow;

const Container = styled.div`
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAMklEQVQoU2P8/5//PwMYfIBQaICRCAX/oSZgNYCB8f9/khUIQI2CuAmLCQQVoLqFoBsA13oh6VgfNmcAAAAASUVORK5CYII=)
    repeat;

  border-top: 2px solid #898989;
  border-left: 2px solid #898989;

  box-shadow: 1px 1px 0 1px white;

  grid-column: 1 / span 9;
  grid-row: 3;

  overflow-y: scroll;
`;
