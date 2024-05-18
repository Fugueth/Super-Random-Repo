import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/index.css"

import { appWindow } from '@tauri-apps/api/window'
// @ts-ignore
document
  .getElementById('titlebar-minimize')
  .addEventListener('click', () => appWindow.minimize())
// @ts-ignore
document
  .getElementById('titlebar-maximize')
  .addEventListener('click', () => appWindow.toggleMaximize())
// @ts-ignore
document
  .getElementById('titlebar-close')
  .addEventListener('click', () => appWindow.close())

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
