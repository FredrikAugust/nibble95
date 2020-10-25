import { css } from "styled-components";

const Index = css`
  * {
    /* Turn off eye comfort */
    font-family: "95font";
    -webkit-font-smoothing: none;
    font-smooth: never;
    box-sizing: border-box;
    outline: none;
  }
`;

const Component = css`
  height: calc(100vh - 44px);
`;

export { Component, Index };
