import { css } from "styled-components";
import { ApplicationWindowTypes } from "../../../state/applicationWindowState";

const Bar = css`
  height: 1.6em;
  font-size: 1.1em;
  background-color: rgb(8, 76, 126);
  color: white;
  padding: 3px 3px 2px 6px;
  border-radius: 5px;

  margin: -0.5em; /* Counteract the padding from window */

  display: flex;
  justify-content: space-between;

  span {
    line-height: 1.3em;
  }

  grid-column: 1 / span 13;
  grid-row: 1;
`;

const Window = css`
  background: white;

  border: 1px solid black;
  border-radius: 5px;

  display: grid;
  grid-template-columns: repeat(12, 8.25%);
  padding: 0.5em;
  transition: all 2s;
  height: 100%;
`;

const BarButton = css`
  padding: 0 1px;
  font-size: 0.9em;
  line-height: 1em;
  min-height: 1.15em;
  min-width: 1.15em;
  margin-right: 2px;
  margin-top: 1px;
  outline: none;
  background-color: #c3c3c3;
  font-weight: 600;

  border-top: 2px solid white;
  border-left: 2px solid white;

  box-shadow: 1px 1px 0 1px black;
`;

export { Bar, Window, BarButton };
