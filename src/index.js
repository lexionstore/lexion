// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./HomePage"; // 수정된 컴포넌트로 연결

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);
