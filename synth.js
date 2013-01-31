var Oscillator = require('./synth.osc')
  , flanger = require('./flanger')
  , envelope = require('./envelopes')
//  , Time = require('since-when')
  , OZ = require('./oscillators')
  , reverb = require('./reverb')
  , Delay = require('./Delay')
;

module.exports = function(freq, duration){
  
  var synth = function(t, i, f){
    synth.sample = 0;
    synth.t = t;
    synth.f = f || synth.f;
    synth.i = i;
    return synth
  };

//  var SAMPLERATE = this.samplerate =  SAMPLERATE || 44100;

//  if(duration == Infinity) duration = 4000 // ms

//  synth.time = new Time()
  synth.f = freq;
//  synth.duration = duration;
  synth.type = 0;
  synth.sustain = false;
  synth.t = 0;
  synth.i = 0;
//  synth.buffer = new Float32Array((duration / 1e3) * SAMPLERATE);
  synth.arrayBank = [];

/*  synth.SAMPLE = function(){

    return this.buffer[this.i] = this.sample

  };
*/

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

  synth.sine = osc.sine(1, freq);

  synth.square = osc.square(1, freq);
 
  synth.triangle = osc.triangle(1, freq);

  synth.saw = osc.saw(1, freq);

  synth.saw_i = osc.saw_i(1, freq);

  synth.triangle_s = osc.triangle_s(1, freq)

  synth.envelope = new envelope([1/32, 0], [3/32,1], [3/32,0], [1/32,0]);
  synth.envelope2 = new envelope([1/128, 0], [3/128,.8], [3/128,0], [1/128,0]);

  synth.flang = flanger(50);

  synth.delay = Delay(80, .5);
  synth.d2 = Delay(33, .3);  
  synth.d3 = Delay(66, .1);
  synth.reverb = reverb();

  return synth

}
