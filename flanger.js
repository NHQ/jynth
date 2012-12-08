var Osc = require('./oscillators')();

module.exports = function(delay, gain, feedback, shift, lof, wave, fade){

    var i = -1;

    function flanger(){
      var f = flanger;
      var d = 2 * Math.round((f.delay / 2) + Math.round(f.shift * this.oz[f.wave](this.t, f.lof)));
      f.io.copy(f.io, 0, 8);
      f.io.writeFloatLE(this.sample, f.l-8);
      var x = f.io.readFloatLE(f.l - (d * 4) - 8);
      var y = f.io.readFloatLE(f.l - (d* 4) - 4);
      this.sample += (f.gain * x) + (f.feedback * y)
      f.io.writeFloatLE(this.sample, f.l-4);
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
    f.io = new Buffer(((f.delay + f.shift) * 2) * 4);
    f.l = flanger.io.length;
    f.io.fill(0);
    return flanger

  };
