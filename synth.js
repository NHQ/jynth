var Oscillator = require('./synth.osc')
  , flanger = require('./flanger')
  , envelope = require('./envelopes')
  , Time = require('since-when')
  , OZ = require('./oscillators')
  , reverb = require('./reverb')
;

module.exports = function(freq, duration){
  
  var synth = function(t, i, f){
    synth.sample = 0;
    synth.t = t;
    synth.f = f || synth.f;
    synth.i = i;
    return synth
  };

  var SAMPLERATE = this.samplerate =  SAMPLERATE || 44100;

  if(duration == Infinity) duration = 4000 // ms

  synth.time = new Time()
  synth.f = freq;
  synth.duration = duration;
  synth.type = 0;
  synth.sustain = false;
  synth.t = 0;
  synth.i = 0;
  synth.buffer = new Float32Array((duration / 1e3) * SAMPLERATE);
  synth.arrayBank = [];

  synth.SAMPLE = function(){

    return this.buffer[this.i] = this.sample

  };

  synth.flange = function(delay, gain, feedback){
    
    return flanger;

    var i = -1;

    function flanger(){
      flanger.io[i++] = this.sample;
      flanger.io[i++] = this.sample += (gain * (flanger.io[i - delay - 1] || 0)) + (feedback * flanger[i - delay] || 0);
      return this;      
    };

    // this array carries both in and out staggered. in == even, out == odd
    flanger.io = new Float32Array(this.buffer.length * 2);

  };

  var osc = synth.osc = Oscillator;

  synth.oz = OZ();

  synth.noise = function(a, f){
    this.sample += (this.oz.sine(Math.random(), 1) * (a || 1));
    return this
  };

  synth.AMOD = function(c, r, t, f){
    return (c + (r * this.oz.sine(t, f)))
  };

  synth.amod = function(c, r, f){
    this.sample *= (c + (r * this.oz.sine(this.t, f)))
    return this
  };

  synth.sine = osc.sine(freq);

  synth.square = osc.square(freq);
 
  synth.triangle = osc.triangle(freq);

  synth.saw = osc.saw(freq);

  synth.saw_i = osc.saw_i(freq);

  synth.triangle_s = osc.triangle_s(freq)

  synth.envelope = new envelope([1,1], [1,0], [1,1], [1,0]);

  synth.flang = flanger(22);

  synth.reverb = reverb();

  return synth

}
