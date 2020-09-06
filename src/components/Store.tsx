import React, { useContext } from 'react';
import styled from 'styled-components';
import { reducer } from '../reducers/basket';
import Basket from './Basket';
import ShopWindow from './ShopWindow';
import Window from './Window';
import { GlobalContext, GlobalActionTypes } from '../globalState';

interface StoreProps {
  className?: string;
  state: 'focused' | 'not_focused' | 'minimized';
  name: string;
  onClick: Function;
}

const Store: React.FC<StoreProps> = (props: StoreProps) => {
    const [basketState, basketDispatch] = React.useReducer(reducer, {});
    const { dispatch } = useContext(GlobalContext);
    const { className, name, onClick } = props;

    const logout = () => dispatch({ type: GlobalActionTypes.LOGOUT_USER })


    return (
        <Window className={className} name={name} onClick={onClick} onClose={logout}>
            <h1>
                <img
                    src={`${process.env.PUBLIC_URL}/logo.png`}
                    alt="Nibble Logo (Windows 95 Search Computer Icon)"
                />
        Welcome to
                {' '}
                <strong>Nibble</strong>
                <span>95</span>
            </h1>
            <ShopWindow dispatch={basketDispatch} />
            <Basket dispatch={basketDispatch} balance={0} basket={basketState} />
        </Window>
    );
};

export default styled(Store)`
  h1 {
    padding: 0;
    margin: 0;

    font-size: 2.2em;

    font-weight: 600;
    font-family: serif;

    grid-column: 1 / span 13;
    grid-row: 2;

    strong {
      font-weight: 800;
    }

    span {
      color: white;
      font-weight: 100;
      font-size: 1.2em;
    }

    img {
      margin-right: 0.3em;
      vertical-align: middle;
      margin-top: -10px;
    }
  }

  grid-template-rows: 1.6em 3.2em auto;

  height: calc(95vh - 44px);
  width: 97vw;

  /* top: 2.5vh;
  left: 1.5vw; */

  ${(props) => `${props.state === 'focused' ? 'z-index: 1;' : 'z-index: 0'}`}
  ${(props) => `${props.state === 'minimized' ? 'display: none' : ''}`}
`;
