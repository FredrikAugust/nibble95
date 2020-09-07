import React, { Dispatch, useContext } from 'react';
import styled from 'styled-components';
import { Action, add } from '../reducers/basket';
import { StoreObject } from '../types/StoreObject';
import { GlobalContext } from '../globalState';
import { IMAGE_URI } from '../artillery/API';

interface ShopWindowItemProps {
  dispatch: Dispatch<Action>;
  storeObject: StoreObject ;
}

const ShopWindowItem: React.FC<ShopWindowItemProps> = ({
    dispatch,
    storeObject,
}: ShopWindowItemProps) => (
    <WindowItem key={storeObject.pk} onClick={() => dispatch(add(storeObject))}>
        <div>
            <img
                src={storeObject.image ? IMAGE_URI(storeObject.image.sm) : ''}
                alt={storeObject.name}
            />
            <hr />
            <h3>{storeObject.name}</h3>
            <p>{`${storeObject.price} NOK`}</p>
        </div>
    </WindowItem>
);

type ShopWindowProps = {
  dispatch: Dispatch<Action>
}

const ShopWindow: React.FC<ShopWindowProps> = ({ dispatch }: ShopWindowProps) => {
    const { state } = useContext(GlobalContext);
    return (
        <Container>
            {state.items.length === 0
                ? 'Loading...'
                : state.items.map((e) => (
                    <ShopWindowItem key={e.pk} storeObject={e} dispatch={dispatch} />
                ))}
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

const WindowItem = styled.button`
  width: calc(100% / 3 - 2em);
  margin: 1em;
  float: left;
  padding: 15px;
  outline: 0;

  background: #c3c3c3;

  border-left: 2px solid white;
  border-top: 2px solid white;
  border-right: 2px solid #929292;
  border-bottom: 2px solid #929292;

  box-shadow: 1px 1px 0 1px black;

  img {
    width: 126px;
    height: 151px;
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
