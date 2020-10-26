import styled, { css } from "styled-components";
import { ApplicationWindowTypes } from "../../../state/applicationWindowState";

const Main = css`
  background-color: rgb(8, 76, 126);
  padding: 3px 3px 5px 3px;
  border-top: 1px solid white;

  display: flex;
  height: 44px;
  position: relative;
  z-index: 4815162342;
`;

const Money = css`
  align-self: center;
  height: 28px;
  margin-left: auto; /* Move to right */

  margin-right: 5px;

  font-weight: 0;
  font-size: 1.2em;


  border: 2px solid white;
  border-radius: 5px;
  color: white;

  padding: 0 1em;

  display: flex;

  span {
    align-self: center;
    display: block;
  }
`;

export { Main, Money };
