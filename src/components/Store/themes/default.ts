import { css } from "styled-components";
import { StoreProps } from "../index";

const Store = css<StoreProps>`
  h1 {
    display: none;
  }
  display: grid;
  grid-template-rows: 1.6em 3.2em auto min-content;
  grid-row: 1 / span 2;
  ${(props) => `${props.user ? "grid-column: 1 /span 2;" : "grid-column: 2;"}`}
`;

const CategoryBar = css`
  display: flex;
`;

const ShopWindow = css`
  overflow-y: scroll;
  grid-column: 1 / span 9;
  grid-row: 3;
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px;
`;

const ShopItem = css`
  width: calc(100% / 3 - 2em);
  margin: 1rem 0.5rem;
  margin-top: 0;
  border: 2px solid black;
  border-radius: 5px;
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
    width: 60%;
  }
  div > div {
    background-color: #f9b759;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { Store, CategoryBar, ShopWindow, ShopItem };
