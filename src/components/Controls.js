import "./Controls.css";

function Controls({ gainLvl, filterFreq, oscType, setOscType, gain, filter }) {
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
    </div>
  );
}

export default Controls;
