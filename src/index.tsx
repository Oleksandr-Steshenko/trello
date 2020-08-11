import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";

import { BrowserRouter } from "react-router-dom";

const Router = BrowserRouter;

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
