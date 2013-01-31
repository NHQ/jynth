var Osc = require('./oscillators')();
var Buffer = require('buffer').Buffer;
module.exports = function(delay, attenuation){

    function reverb(){
	var f = reverb;
      var d = f.delay // Math.round((f.delay) + Math.round(f.shift * this.oz[f.wave](this.t, f.lof)));
	var z = 1;
      var verb = 0;
      for(z = 1; z <= d; ++z){
        verb += f.io.readFloatLE(f.l - (z * 4)) * (1/Math.pow(1.67, z));
      };
//console.log(verb);
      f.io.copy(f.io, 0, 4);
      f.io.writeFloatLE(this.sample, f.l-4);
      this.sample += verb;
      return this;
    };

    var f = reverb;
    f.delay = delay || 100;
    f.shift = 5;
    f.io = new Buffer(((f.delay + f.shift) * 4));
    f.l = f.io.length;
//    f.io.fill(0);
    f.e = 2.71828;
    f.wave = 'sine';
    f.lof = .5;
    return reverb

  };
  
