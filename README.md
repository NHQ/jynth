chain synth parts and get a sample from it all

***includes*** 
oscillators (sine, square, saw, saw_i (inverted), triangle)
amod,
noise,
envelope,
flanger,
reverb

    function play(t,i){
      
      return +
      synth(t, i, f).
      sine(.8, f). 
      sine(.15, f/5).
      sine(.25/4, f/5).
      saw(.25/8, f/2).
      noise(.0005).
      flang().
      envelope([1/16, 1.3],[3/8, .75], [1.2, .75], [2/8, 0]).
      amod(.5, .4, 20).
      reverb().
      sample * .8
    
    };
