import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";

// Update the basename for GitHub Pages
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter basename={import.meta.env.DEV ? "/" : "/Kanda-VTP-Analytics-Dashboard-Redesign/"}>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
