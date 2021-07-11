import { useContext, useEffect, useState } from "react";
import "./App.css";

import Controls from "./Controls";

import audioCtx from "./audioContext.js";

const gain = audioCtx.createGain();
const filter = audioCtx.createBiquadFilter();
gain.connect(filter);
filter.connect(audioCtx.destination);

function App() {
  const [gainLvl, setGainLvl] = useState(100);
  const [filterFreq, setFilterFreq] = useState("10000");
  const [oscType, setOscType] = useState("sine");
  const [octave, setOctave] = useState(1);

  const activeOscillators = {};

  const testFreqs = {
    a: 216,
    f: 432,
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  useEffect(() => {
    gain.gain.value = gainLvl;
    filter.frequency.value = filterFreq;
  }, [gainLvl, filterFreq]);

  function playNote(key) {
    const osc = audioCtx.createOscillator();
    osc.frequency.setValueAtTime(testFreqs[key] * octave, audioCtx.currentTime);
    osc.type = oscType;
    activeOscillators[key] = osc;
    activeOscillators[key].connect(gain);
    activeOscillators[key].start(audioCtx.currentTime);
  }

  function handleKeyDown(e) {
    if (!e.repeat) {
      playNote(e.key);
    }
  }

  function handleKeyUp(e) {
    if (activeOscillators[e.key]) {
      activeOscillators[e.key].stop();
    }
    delete activeOscillators[e.key];
  }

  function handleGainChange(e) {
    e.preventDefault();
    setGainLvl(e.target.value);
    console.log(gainLvl);
  }

  function handleFilterChange(e) {
    setFilterFreq(e.target.value);
  }

  return (
    <div className="App">
      <button onClick={() => audioCtx.resume()}>Start Audio Context</button>
      <Controls
        gain={gain}
        filter={filter}
        gainLvl={gainLvl}
        filterFreq={filterFreq}
        oscType={oscType}
        setOscType={setOscType}
      />
    </div>
  );
}

export default App;
