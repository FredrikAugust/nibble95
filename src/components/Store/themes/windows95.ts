import { css, ThemeProps } from "styled-components";
import { ApplicationWindowTypes } from "../../../state/applicationWindowState";
import { StoreProps } from "../index";

// Necesarry typing to avoid some weird prop expectancy conflict
// TODO learn more about the problem
const Store = css<ThemeProps<StoreProps>>`
    grid-template-rows: 1.6em 3.2em auto min-content;
    grid-row: 1 /span 2;
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
    ${(props) =>
      `${props.theme.user ? "grid-column: 1 /span 2;" : "grid-column: 2;"}`}
`;

const CategoryBar = css`
  grid-row: 4;
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;
`;

const ShopWindow = css`
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAMklEQVQoU2P8/5//PwMYfIBQaICRCAX/oSZgNYCB8f9/khUIQI2CuAmLCQQVoLqFoBsA13oh6VgfNmcAAAAASUVORK5CYII=)
    repeat;
  border-top: 2px solid #898989;
  border-left: 2px solid #898989;
  box-shadow: 1px 1px 0 1px white;
  grid-column: 1 / span 9;
  grid-row: 2 / span 2;
  overflow-y: scroll;
`;

const ShopItem = css`
  width: calc(100% / 4 - 2em);
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
