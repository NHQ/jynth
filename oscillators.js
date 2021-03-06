module.exports = function (freq){

    var f = freq;

    var OZ = {};

    OZ.sine = sine;
    OZ.saw = saw;
    OZ.saw_i = saw_i;
    OZ.triangle = triangle;
    OZ.triangle_s = triangle_s;
    OZ.square = square;

    return OZ

    function sine(t, f){

	return Math.sin(2 * t * f * Math.PI);
	
    };

    function saw(t, f){

	var n = ((t % (1/f)) * f) % 1; // n = [0 -> 1]

	return -1 + (2 * n)

    };

    function saw_i(t, f ){

	var n = ((t % (1/f)) * f) % 1; // n = [0 -> 1]

	return 1 - (2 * n)

    };

    function triangle(t, f   ){
	
	var n = ((t % (1/f)) * f) % 1; // n = [0 -> 1]
	
	return n < 0.5 ? -1 + (2 * (2 * n)) : 1 - (2 * (2 * n))
	
    };

    function triangle_s(t, f   ){
	
	var n = ((t % (1/f)) * f) % 1; // n = [0 -> 1]
	
	var s = Math.abs(Math.sin(t));
	
	return n < s ? -1 + (2 * (2 * (n / s))) : 1 - (2 * (2 * (n / s)))
	
    };

    function square(t, f){

	return ((t % (1/f)) * f) % 1 > 0.5 ? 1 : -1;

   };

};
