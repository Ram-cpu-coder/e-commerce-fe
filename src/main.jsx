import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/reduxStore.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
