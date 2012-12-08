var Osc = require('./oscillators')();

var e = module.exports;

e.sine = function(){
  var f, osc = Osc.sine;
  return function(a, f){
    f = f || this.f; a = a || 1;
    this.sample += (a * osc(this.t, f));
    return this
  }
};

e.saw = function(){
  var f, osc = Osc.saw;
  return function(a, f){
    f = f || this.f; a = a || 1;
    this.sample += (a * osc(this.t, f));
    return this
  }
};

e.square = function(){
  var f, osc = Osc.square;
  return function(a, f){
    f = f || this.f; a = a || 1;
    this.sample += (a * osc(this.t, f));
    return this
  }
};

e.triangle = function(){
  var f, osc = Osc.triangle;
  return function(a, f){
    f = f || this.f; a = a || 1;
    this.sample += (a * osc(this.t, f));
    return this
  }
};

e.triangle_s = function(freq){
  var f, osc = Osc.triangle_s;
  return function(a, f){
    f = f || this.f; a = a || 1;
    this.sample += (a * osc(this.t, f));
    return this
  }
};

e.saw_i = function(freq){
  var osc = Osc.saw_i;
  freq = freq || 0;
  return function(a, f){
    f = f || freq; a = a || 1;
    this.sample += (a * osc(this.t, f));
    return this
  }
}
