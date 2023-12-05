import React from "react";
import ReactDOM from "react-dom/client";
import App from "./containers/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Toaster } from "sonner";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster richColors />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
