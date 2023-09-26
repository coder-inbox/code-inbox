import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NylasProvider } from "@nylas/nylas-react";
import { store, persistor } from "@app/store/root";
import App from "./App.jsx";
import "./style.css";
import { BrowserRouter } from "react-router-dom";

const SERVER_URL =
  process.env.VITE_SERVER_URL || "http://localhost:8000/api/v1";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NylasProvider serverBaseUrl={SERVER_URL}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NylasProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
