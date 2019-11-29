import React from "react";

import styled from "styled-components";

import { reducer } from "./../reducers/basket";

import { User } from "../types/User";
import Basket from "./Basket";
import ShopWindow from "./ShopWindow";
import Window from "./Window";

interface StoreProps {
  className?: string;
  state: "focused" | "not_focused" | "minimized";
  name: string;
  onClick: Function;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  user: User | undefined;
}

const Store: React.FC<StoreProps> = ({ className, name, onClick }) => {
  const [state, dispatch] = React.useReducer(reducer, {});

  return (
    <Window className={className} name={name} onClick={onClick}>
      <h1>
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Nibble Logo (Windows 95 Search Computer Icon)"
        />
        Welcome to <strong>Nibble</strong>
        <span>95</span>
      </h1>
      <ShopWindow dispatch={dispatch} />
      <Basket dispatch={dispatch} balance={0} basket={state}></Basket>
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

  ${props => `${props.state === "focused" ? "z-index: 1;" : "z-index: 0"}`}
  ${props => `${props.state === "minimized" ? "display: none" : ""}`}
`;
