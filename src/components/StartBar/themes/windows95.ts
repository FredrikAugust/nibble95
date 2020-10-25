import styled, { css } from "styled-components";
import { ApplicationWindowTypes } from "../../../state/applicationWindowState";

const Main = css`
  background-color: #c3c3c3;
  padding: 3px 3px 5px 3px;
  border-top: 1px solid white;
  box-shadow: 0px 0px 1px 1px #e8e8e8;
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

  border-top: 2px solid #828282;
  border-left: 2px solid #828282;

  box-shadow: 1px 1px 0 1px white;

  padding: 0 1em;

  display: flex;

  span {
    align-self: center;
    display: block;
  }
`;

export { Main, Money };
