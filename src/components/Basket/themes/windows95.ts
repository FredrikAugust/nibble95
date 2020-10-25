import { css } from "styled-components";
import { ApplicationWindowTypes } from "../../../state/applicationWindowState";

const Item = css`
  font-size: 0.9em;
  h3,
  h5 {
    margin: 0;
    padding: 0;
    font-weight: 100;
  }

  h5 {
    margin-bottom: 4px;
  }

  display: flex;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid #929292;
  border-bottom: 1px solid #929292;
  box-shadow: 1px 1px 0 1px black;
  padding: 3px;
  margin-bottom: 5px;

  & > h5 {
    margin-left: auto;
    align-self: center;

    font-weight: 100;

    font-size: 1em;
    color: #000082;

    span {
      color: black;
    }
  }
`;

const Container = css`
  overflow: hidden;
  grid-column: 10 / span 3;
  grid-row: 3;
  padding-left: 1em;

  display: grid;

  grid-template-columns: 100%;
  grid-template-rows: min-content auto 2px min-content;

  grid-row-gap: 5px;

  hr {
    border-top: 1px solid #929292;
    border-bottom: 1px solid white;

    margin: 0;
    padding: 0;
  }

  h3 {
    margin: 0;
    font-weight: 100;
    font-size: 1.2em;

    img {
      vertical-align: middle;
      margin-right: 0.3em;
    }

    span {
      font-weight: 100;
    }
  }

  & > div:nth-child(2) {
    border-top: 1px solid #828282;
    border-left: 1px solid #828282;
    border-right: 1px solid white;
    border-bottom: 1px solid white;

    padding: 5px;
  }
`;

const Purchase = css`
  background-color: #008282;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-bottom: 1px solid #929292;
  border-right: 1px solid #929292;
  box-shadow: 1px 1px 0 1px black;
  margin: 1px 3px 3px 1px;

  color: white;

  font-size: 1em;
  padding: 1rem;
  text-align: left;

  img {
    margin-right: 0.3em;
    vertical-align: middle;
    height: 0.9em;
    margin-top: -5px;
    margin-left: 0.1em;
  }

  outline: 0;

  &:active {
    box-shadow: 3px 3px 0 4px black;
  }

  font-weight: 100;
`;

export { Item, Container, Purchase };
