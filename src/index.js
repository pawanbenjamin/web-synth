import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import audioCtx from "./audioContext.js";

export const MyContext = React.createContext();

const gain = audioCtx.createGain();
const filter = audioCtx.createBiquadFilter();
gain.connect(filter);
filter.connect(audioCtx.destination);

const ReactAudioContext = {
  audioCtx,
  gain,
  filter,
};

ReactDOM.render(
  <MyContext.Provider value={ReactAudioContext}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MyContext.Provider>,

  document.getElementById("root")
);
