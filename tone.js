// Next goal: pull this into index.html

// create a Tone class
function Tone(context, freq = 440, wave = "sine") {
  this.context = context;
  this.status = 0;
  this.freq = freq || 440;
  this.wave = wave || "square";
}

// tones have required properties
Tone.prototype.setup = function() {
  this.osc = context.createOscillator();
  this.osc.type = "sine";
  this.osc.frequency.setValueAtTime( this.freq , this.context.currentTime ) ; 
  this.gainNode = this.context.createGain();
  this.gainNode.gain.setValueAtTime( 1, this.context.currentTime ) ; 
  this.filter = this.context.createBiquadFilter();
  this.osc.connect(this.gainNode);
  this.gainNode.connect(this.filter);
  this.filter.connect(context.destination);
};

// this is how we start a tone
Tone.prototype.start = function() {
  this.setup();
  this.osc.start(0);
  this.status = 1;
};

// this is how we stop a tone
Tone.prototype.stop = function() {
  this.osc.stop(0);
  this.status = 0;
};
