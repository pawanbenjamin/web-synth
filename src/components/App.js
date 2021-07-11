import { useEffect, useState } from "react";
import "./App.css";

import Controls from "./Controls";

import audioCtx from "../audioContext.js";
import Keyboard from "./Keyboard";

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
    90: 261.625565300598634,
    83: 277.182630976872096,
    88: 293.66476791740756,
    68: 311.12698372208091,
    67: 329.627556912869929,
    86: 349.228231433003884,
    71: 369.994422711634398,
    66: 391.995435981749294,
    72: 415.304697579945138,
    78: 440.0,
    74: 466.163761518089916,
    77: 493.883301256124111,
    188: 523.251130601197269,
    81: 523.251130601197269,
    50: 554.365261953744192,
    87: 587.32953583481512,
    51: 622.253967444161821,
    69: 659.255113825739859,
    82: 698.456462866007768,
    53: 739.988845423268797,
    84: 783.990871963498588,
    54: 830.609395159890277,
    89: 880.0,
    55: 932.327523036179832,
    85: 987.766602512248223,
    73: 1046.5,
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
    if (!e.repeat && testFreqs[e.keyCode]) {
      let element = document.getElementById(e.keyCode);
      element.classList.add("pressed");
      playNote(e.keyCode);
    }
  }

  function handleKeyUp(e) {
    if (activeOscillators[e.keyCode]) {
      let element = document.getElementById(e.keyCode);
      element.classList.remove("pressed");
      activeOscillators[e.keyCode].stop();
    }
    delete activeOscillators[e.keyCode];
  }

  return (
    <div className="App">
      <Controls
        gain={gain}
        filter={filter}
        gainLvl={gainLvl}
        filterFreq={filterFreq}
        oscType={oscType}
        setOscType={setOscType}
      />
      <Keyboard />
    </div>
  );
}

export default App;
