import "./Controls.css";

function Controls({
  gainLvl,
  filterFreq,
  oscType,
  setOscType,
  gain,
  filter,
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
  audioCtx,
}) {
  return (
    <div className="controls">
      <select value={oscType} onChange={(e) => setOscType(e.target.value)}>
        <option value="sawtooth">SawTooth</option>
        <option value="sine">Sine</option>
        <option value="square">Square</option>
      </select>

      <input
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
        max="0.2"
        step="0.001"
        defaultValue={attack}
        onChange={(e) => {
          setAttack(e.target.value);
          let val = parseFloat(sustainVal);
          console.log(audioCtx.currentTime);
          let currTime = parseFloat(audioCtx.currentTime);
          let att = parseFloat(attack);
          let dec = parseFloat(decay);
          gain.gain.linearRampToValueAtTime(val, currTime + att + dec);
        }}
      />
      <input
        type="range"
        min="0"
        max="1"
        step="0.001"
        value="0.2"
        defaultValue={decay}
      />
      <input
        type="range"
        min="0"
        max="1"
        step="0.001"
        value="0.3"
        defaultValue={sustain}
      />
      <input
        type="range"
        min="0"
        max="0.2"
        step="0.001"
        value="0.1"
        defaultValue={sustainVal}
      />
      <input
        type="range"
        min="0"
        max="1"
        step="0.001"
        value="0.2"
        defaultValue={release}
      />
    </div>
  );
}

export default Controls;
