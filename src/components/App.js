import { useEffect, useState, useContext } from "react";
import "./App.css";

import Controls from "./Controls";

import { MyContext } from "../index";

import Keyboard from "./Keyboard";

function App() {
  let myAudioContext = useContext(MyContext);

  const gain = myAudioContext.gain;
  const filter = myAudioContext.filter;

  const [gainLvl, setGainLvl] = useState(50);
  const [filterFreq, setFilterFreq] = useState("10000");
  const [oscType, setOscType] = useState("sine");
  const [octave, setOctave] = useState(0.25);
  const [attack, setAttack] = useState(0.1);
  const [decay, setDecay] = useState(0.2);
  const [sustain, setSustain] = useState(0.5);
  const [sustainVal, setSustainVal] = useState(0.1);
  const [release, setRelease] = useState(0.2);

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
    console.log(oscType);
  }, [oscType]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    console.log(attack);
    console.log(myAudioContext.audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(
      1,
      myAudioContext.audioCtx.currentTime + 4
    );
  }, [attack]);

  function playNote(key) {
    const osc = myAudioContext.audioCtx.createOscillator();
    osc.type = document.getElementById("waveform").value;
    activeOscillators[key] = osc;
    activeOscillators[key].connect(gain);
    // try setting this to frequency.value, the using linear ramp to value, at current time plus attack
    // osc.frequency.setValueAtTime(
    //   testFreqs[key] * octave,
    //   myAudioContext.audioCtx.currentTime
    // );
    osc.frequency.value = testFreqs[key];
    let att = document.getElementById("attack").value;
    console.log(att);
    gain.gain.linearRampToValueAtTime(
      1,
      myAudioContext.audioCtx.currentTime + att
    );
    activeOscillators[key].start(myAudioContext.audioCtx.currentTime);
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
        attack={attack}
        setAttack={setAttack}
        decay={decay}
        setDecay={setDecay}
        sustain={sustain}
        setSustain={setSustain}
        sustainVal={sustainVal}
        setSustainVal={setSustainVal}
      />
      <Keyboard />
    </div>
  );
}

export default App;
