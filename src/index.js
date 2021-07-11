import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import audioCtx from "./audioContext";

const gain = audioCtx.createGain();
const filter = audioCtx.createBiquadFilter();
gain.connect(filter);
filter.connect(audioCtx.destination);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
