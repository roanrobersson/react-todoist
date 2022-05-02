import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "./state/store";
import App from "@/App";
import LeftMenuProvider from "./providers/LeftMenuProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <LeftMenuProvider>
        <CssBaseline />
        <App />
      </LeftMenuProvider>
    </Provider>
  </React.StrictMode>
);
