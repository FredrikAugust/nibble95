import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import App from "./components/App";

import { fetchToken, loadToken } from "./artillery/API";

if (!loadToken()) {
  fetchToken().catch(() =>
    console.warn(
      "It appears you have not provided the token required for the app to run."
    )
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
