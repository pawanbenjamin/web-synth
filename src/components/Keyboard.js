import React from "react";
import "./Keyboard.css";

function Keyboard(props) {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="keys top">
          <div id="small"></div>
          <div>
            <input type="button" id="50" value="2" />
            <input type="button" id="51" value="3" />
          </div>
          <div id="big"></div>
          <div>
            <input type="button" id="53" value="5" />
            <input type="button" id="54" value="6" />
            <input type="button" id="55" value="7" />
          </div>
        </div>
        <div className="keys">
          <input type="button" id="81" value="q" />
          <input type="button" id="87" value="w" />
          <input type="button" id="69" value="e" />
          <input type="button" id="82" value="r" />
          <input type="button" id="84" value="t" />
          <input type="button" id="89" value="y" />
          <input type="button" id="85" value="u" />
          <input type="button" id="73" value="i" />
        </div>
        <div className="octave-divider"></div>
        <div className="keys">
          <div id="small"></div>
          <input type="button" id="83" value="s" />
          <input type="button" id="68" value="d" />
          <div id="big"></div>
          <input type="button" id="71" value="g" />
          <input type="button" id="72" value="h" />
          <input type="button" id="74" value="j" />
        </div>
        <div className="keys bottom">
          <input type="button" id="90" value="z" />
          <input type="button" id="88" value="x" />
          <input type="button" id="67" value="c" />
          <input type="button" id="86" value="v" />
          <input type="button" id="66" value="b" />
          <input type="button" id="78" value="n" />
          <input type="button" id="77" value="m" />
          <input type="button" id="188" value="," />
        </div>
        {/* <div className="keys">
          <input type="button" value="SPACE" />
        </div> */}
      </div>
    </div>
  );
}

export default Keyboard;
