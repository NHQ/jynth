var Osc = require('./oscillators')();
var Buffer = require('buffer').Buffer;

module.exports = function(delay, gain, feedback, shift, lof, wave, fade){

    var i = -1;

    function flanger(){

      var f = flanger;
      var d = f.delay // Math.round((f.delay / 2) + Math.round(f.shift * this.oz[f.wave](this.t, f.lof)));

	// read offset delay and feedback samples
 
      var x = f.delayBuffer.readFloatLE(f.delayOff);
      
      var y = f.feedbackBuffer.readFloatLE(f.delayOff);

	// write samples in the future

      var dealy = f.delayOff + (d * 4);

      console.log(x, y, dealy)

      if(dealy >= f.delayBuffer.length) dealy = 0;

      f.delayBuffer.writeFloatLE(this.sample, dealy);

      this.sample += (f.gain * x) + (f.feedback * y)

      f.feedbackBuffer.writeFloatLE(this.sample, dealy);

      f.delayOff += 4;

      if(f.delayOff >= f.delayBuffer.length) f.delayOff = 0;

      if(f.delayOff >= f.delayBuffer.length) f.delayOff = 0;

      if(f.feedbackOff >= f.feedbackBuffer.length) f.feedbackOff = 0;

      f.gain *= f.fade;
      f.feedback *= f.fade;

      return this;
    };

    var f = flanger;
    f.delay = delay || 8;
    f.gain = gain || .9;
    f.fade = fade || .999;
    f.feedback = feedback || .7111;
    f.shift = shift || 3;
    f.lof = lof || .5;
    f.wave = wave || 'sine';
    f.delayBuffer = new Buffer((f.delay + f.shift) * 4);
    f.feedbackBuffer = new Buffer((f.delay + f.shift) * 4);
    f.l = flanger.delayBuffer.length;
//    f.delayBuffer.fill(0);
//    f.feedbackBuffer.fill(0);
    f.feedbackOff = f.delayOff = 0;

    return flanger

  };
