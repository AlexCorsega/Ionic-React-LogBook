import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { AuthProvider } from "./authentication/auth";
import dotenv from "dotenv";

const container = document.getElementById("root");
const root = createRoot(container!);
dotenv.config();
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
defineCustomElements(window);
