import React from "react";
import ReactDOM from "react-dom/client";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

import ClassicalComponent from "../index.js";

document.addEventListener("DOMContentLoaded", function () {
  const elem = document.getElementById("root");
  if (elem) {
    ReactDOM.createRoot(elem).render(React.createElement(ClassicalComponent,
      { literally: "anything" }
    ));
  }
});