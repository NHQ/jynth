// values are zero-one normalized
// time is not (duh)
// a = attack, length time from 0 to 1
// d = decay, length time 1 to sustain
// s = sustain, value [0,1], or boolean for real time control
// t = sustain length, time at sustain value
// r = release, length time from sustain level to zero 
// var oscillators = require('../oscillators');

module.exports = function(a, d, s, r){

  function e(a, d, s, r){

    if (arguments.length) init(a, d, s, r);

    var t = this.t;

    var z;

    this.sample *= compute();

    function compute(){
      z = t % e._duration;
      if (z <= e.a[0]) return e.a.slope(z);
      else if (z <= e.a[0] + e.d[0]) return e.d.slope(z - (e.a[0]));
      else if (z <= e.a[0] + e.d[0] + e.s[0]) return e.s.slope(z - (e.a[0] + e.d[0]));
      else if (z <= e._duration) return e.r.slope(z - (e.a[0] + e.d[0] + e.s[0]));
      else return 1
    };

    return this
  };

  init(a, d, s, r);

  return e;

  function init(a, d, s, r){
    a.slope = slope([0, a[0]], [0, a[1]] )
    d.slope = slope([a[0], d[0]], [a[1], d[1]] )
    s.slope = slope([d[0], s[0]], [d[1], s[1]] )
    r.slope = slope([s[0], r[0]], [s[1], r[1]] )

    e.a = a;
    e.d = d;
    e.s = s;
    e.r = r || [0.0];

    e.duration = function(){
      return this.a[0] + this.d[0] + this.s[0] + this.r[0];
    };

    e._duration = e.duration();

    function slope(x, y){
 
      var m = (y[1] - y[0]) / (x[1] - 0);
      m = (isNaN(m)) ? 0 : m;

      return function(t){
        return (m * (t - x[1])) + y[1]
      }
    }
  }

};
