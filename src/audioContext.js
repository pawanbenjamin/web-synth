/* eslint-disable react/no-direct-mutation-state */

const audioCtx = new ( window.AudioContext || window.webkitAudioContext )

audioCtx.onstatechange = function(){console.log(audioCtx.state)}

export default audioCtx