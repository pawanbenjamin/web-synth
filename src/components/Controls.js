import react, { useEffect, useContext } from "react";
import { MyContext } from "..";
import "./Controls.css";

function Controls({
  gainLvl,
  filterFreq,
  oscType,
  setOscType,
  attack,
  setAttack,
  decay,
  setDecay,
  sustain,
  setSustain,
  sustainVal,
  setSustainVal,
  release,
  setRelease,
}) {
  const { audioCtx, gain, filter } = useContext(MyContext);

  console.log(gain);

  return (
    <div className="controls">
      <select
        id="waveform"
        defaultValue={oscType}
        onChange={(e) => setOscType(e.target.value)}
      >
        <option value="sawtooth">SawTooth</option>
        <option value="sine">Sine</option>
        <option value="square">Square</option>
      </select>

      <input
        id="attack"
        type="range"
        min="0"
        max="100"
        step="1"
        defaultValue={gainLvl}
        onChange={(e) => {
          gain.gain.value = e.target.value / 100;
        }}
      ></input>
      <input
        type="range"
        min="20.0"
        max="10000.0"
        step="0.01"
        defaultValue={filterFreq}
        onChange={(e) => {
          filter.frequency.value = e.target.value;
        }}
      ></input>
      <input
        type="range"
        min="0"
        max="0.5"
        step="0.01"
        defaultValue={attack}
        onChange={(e) => {
          let parsedVal = parseFloat(e.target.value);
          setAttack(parsedVal);
    
        }}
      />
    </div>
  );
}

export default Controls;
