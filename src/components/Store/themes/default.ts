import { css, ThemeProps } from "styled-components";
import { ApplicationWindowTypes } from "../../../state/applicationWindowState";
import { StoreProps } from "../index";
import { useContext } from "react";
import { GlobalContext } from "../../../state/globalState";

// Necesarry typing to avoid some weird prop expectancy conflict
// TODO learn more about the problem



const Store = css<ThemeProps<StoreProps>>`

    grid-template-rows: 1.6em 3.2em auto min-content;
    grid-row: 1 /span 3;
    grid-column: 1 / span 3;
    ${(props) =>
      `${
        props.theme.windowActivity === ApplicationWindowTypes.FOCUSED
          ? "z-index: 1;"
          : "z-index: 0;"
      }`}
    ${(props) =>
      `${
        props.theme.windowActivity === ApplicationWindowTypes.MINIMIZED
          ? "display: none;"
          : ""
      }`}
`;

 const CategoryBar = css`
  grid-row: 4;
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;
`;

const ShopWindow = css`
  background: rgb(8, 76, 126);

  border-radius: 5px;
  grid-column: 1 / span 9;
  grid-row: 2 / span 2;
  overflow-y: scroll;
  transition: 2s;
  ::-webkit-scrollbar {
    width: 15px;

  }

  ::-webkit-scrollbar-thumb {
    background: #fcc981;
    border-radius: 5px;

  }

  ::-webkit-scrollbar-thumb:hover {
    background: #F9B759;

  }
`;

const ShopItem = css`
  width: calc(100% / 4 - 2em);
  margin: 1em;
  float: left;
  padding: 5px;
  outline: 0;
  font-size: 0.8em;

  background: white;

  border: none;
  border-radius: 5px;

  @media screen and (max-width: 1200px) {
    width: calc(100% / 3 - 2em);
  }

  @media screen and (max-width: 900px) {
    width: calc(100% / 2 - 2em);
  }

  img {
    width: 100px;
    height: 125px;
    margin: auto;
    display: block;
  }

  hr {
    width: 80%;
    border: 1px solid black;
    border-radius: 5px;
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
`;

const Title = css`
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
`;

export { Store, CategoryBar, ShopWindow, ShopItem, Title };
