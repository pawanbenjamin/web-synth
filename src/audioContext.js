const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

audioCtx.onstatechange = function () {
  console.log(audioCtx.state);
};

export default audioCtx;
