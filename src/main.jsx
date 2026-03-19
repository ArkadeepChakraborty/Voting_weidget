// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter} from 'react-router-dom'; 
// import './index.css'
// import App from './App.jsx'
// import "./i18n"

// createRoot(document.getElementById('root')).render(<App />);


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "./i18n";

/* SHADOW DOM SETUP */
const host = document.getElementById("root");

// create shadow root
const shadowRoot = host.attachShadow({ mode: "open" });

// expose globally
window.__SHADOW_ROOT__ = shadowRoot;

// create mount point inside shadow
const shadowContainer = document.createElement("div");
shadowRoot.appendChild(shadowContainer);

// inject Tailwind styles into shadow DOM
const style = document.createElement("style");
style.textContent = `
  @import url("/src/index.css");
`;
shadowRoot.appendChild(style);

// render React inside shadow
createRoot(shadowContainer).render(<App />);