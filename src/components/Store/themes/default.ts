import { css } from 'styled-components';
import { StoreProps } from '../index';

const Store = css<StoreProps>`
    h1 {
        display: none;
    }
    display: grid;
    grid-template-rows: 1.6em 3.2em auto min-content;
    grid-row: 1 /span 2;
    ${(props) => `${props.user ? 'grid-column: 1 /span 2;' : 'grid-column: 2;'}`}
`;

const CategoryBar = css`
    display: flex;
`;

const ShopWindow = css`
    overflow-y: scroll;
    grid-column: 1 / span 9;
    grid-row: 3;
`;

const ShopItem = css`
    width: calc(100% / 3 - 2em);
    margin: 1rem 0.5rem;
    margin-top: 0;
    border: none;
    padding: 0;
    font-size: 12px;
    div {
        display: flex;
        flex-direction: column;
    }
    img {
        width: 126px;
        height: 151px;
        margin: auto;
        display: block;
    }
    hr {
        display: none;
    }
    div > div {
        background-color: #F9B759;;
    }
`;

// eslint-disable-next-line import/prefer-default-export
export {
    Store,
    CategoryBar,
    ShopWindow,
    ShopItem,
};
