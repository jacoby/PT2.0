/**
 * PRACTIMER JS
 *
 * Finally pulling the active part of Practimer into
 * an external file
 */

/* Just a few globals */
let timer = 5;
let curr = "";
let main = document.getElementsByTagName("body")[0];
let title = document.getElementsByTagName("title")[0];
let time = document.getElementById("time");
let state = "pause";

let interval;
let count = 0;

// Audio Vars
var freq = 440;
var wave = "square";
var AudioContext = window.AudioContext || window.webkitAudioContext || false;
if (AudioContext) {
  var context = new AudioContext();
  context.resume();
  var tone = new Tone(context, freq, wave);
}

// defining keyboard behavior
window.addEventListener("keyup", e => {
  if (e.key === "ArrowRight") {
    prev();
  }
  if (e.key === "ArrowLeft") {
    next();
  }
  if (e.key === "ArrowUp") {
    pause();
  }
  if (e.key === "ArrowDown") {
    start();
  }
});

// defining phone behavior
let mc = new Hammer(main);
mc.get("swipe").set({
  direction: Hammer.DIRECTION_ALL
});

mc.on("swipeleft", prev);
mc.on("swiperight", next);
mc.on("swipeup", pause);
// mc.on("swipedown", start);
mc.on("tap", start);

write_time();

function pause() {
  state = "pause";
  time.classList = [];
  time.classList.add("minP");
  console.log("pause");
}

function start() {
  count = 60 * timer;
  state = "play";
  start_interval();
  time.classList = [];
  time.classList.add("min5");
  console.log("start");
}

function prev() {
  pause();
  console.log("prev");
  change_minute(1);
}

function next() {
  pause();
  console.log("next");
  change_minute(-1);
}

function change_minute(time) {
  console.log(time);
  let newtimer = timer + time;
  if (newtimer > 60) {
    newtimer = 60;
  }
  if (newtimer < 1) {
    newtimer = 1;
  }
  timer = newtimer;
  console.log(["nt", newtimer]);
  write_time();
}

function start_interval() {
  interval = setInterval(clock, 1000);
}

function clock() {
  count--;
  let minutes = parseInt(count / 60);
  let seconds = count % 60;
  let t = Date.now();

  redraw(minutes, seconds);
  if (state === "pause") {
    console.log("PAUSE");
    clearInterval(interval);
    interval = null;
  }
  if (count <= 0) {
    console.log("PAUSE");
    clearInterval(interval);
    interval = null;
    if (AudioContext) {
      tone.start();
      setTimeout(function() {
        tone.stop();
      }, 500);
    }
  } else if (count <= 10) {
    time.classList = [];
    time.classList.add("min1");
    if (AudioContext) {
      tone.start();
      setTimeout(function() {
        tone.stop();
      }, 50);
    }
  }
}

function redraw(minutes = 0, seconds = 0) {
  let min = document.getElementById("minute");
  let sec = document.getElementById("second");
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  console.log([minutes, seconds].join(":"));
  min.innerText = minutes;
  sec.innerText = seconds;
}

function write_time() {
  redraw(timer);
}

//     if (hopper < 0) {
//       window.clearInterval(looper);
//       if (AudioContext) {
//         tone.start();
//         setTimeout(function () {
//           tone.stop();
//         }, 500);
//       }
//       // console.log("done");
//     } else if (hopper < 10) {
//       if (AudioContext) {
//         tone.start();
//         setTimeout(function () {
//           tone.stop();
//         }, 50);
//       }
//       document.getElementById("time").className = "";
//       document.getElementById("time").className = "min1";
//     } else {
//       document.getElementById("time").className = "";
//       document.getElementById("time").className = "min5";
//     }

// function parse_time(entry) {
//   let minutes = 0;
//   let seconds = 0;

//   // 2m50s
//   if (minutes === 0 && seconds === 0) {
//     let minsec = entry.match(/(\d+)m(\d+)s/i);
//     if (typeof minsec && minsec != null && minsec.length) {
//       minutes = minsec[1];
//       seconds = minsec[2];
//     }
//   }
//   // 2m
//   if (minutes === 0 && seconds === 0) {
//     let minsec = entry.match(/(\d+)m/i);
//     if (typeof minsec && minsec != null && minsec.length) {
//       minutes = minsec[1];
//     }
//   }
//   // 2s
//   if (minutes === 0 && seconds === 0) {
//     let minsec = entry.match(/(\d+)s/i);
//     if (typeof minsec && minsec != null && minsec.length) {
//       seconds = minsec[1];
//     }
//   }
//   // convert to seconds < 60 plus minutes
//   if (seconds > 59) {
//     let newsec = parseInt(seconds / 60);
//     minutes = parseInt(minutes) + newsec;
//     seconds = seconds % 60;
//   }
//   // defaults to 5 minutes
//   if (minutes === 0 && seconds === 0) {
//     minutes = 5;
//   }
//   // no more than one hour
//   if (minutes >= 60) {
//     minutes = 60;
//     seconds = 0;
//   }

//   let x = [];
//   x.push(parseInt(minutes));
//   x.push(parseInt(seconds));
//   return x;
// }

// // Audio Vars
// var freq = 880;
// var wave = "square";
// var AudioContext =
//   window.AudioContext || window.webkitAudioContext || false;
// if (AudioContext) {
//   var context = new AudioContext();
//   context.resume();
//   var tone = new Tone(context, freq, wave);
// }

// // Timer Vars
// var looper;
// var target;
// var hopper;
// var number = 5;
// var d = new Date();
// init();

// // Allows for quick change
// window.onhashchange = function () {
//   init();
// };

// // starts timer
// function init() {
//   var hash = location.hash;
//   if (hash != "#about") {
//     let minsec = [];
//     if (hash.length === 0) {
//       hopper = 5 * 60;
//     } else {
//       minsec = parse_time(hash);
//       hopper = minsec[0] * 60 + minsec[1];
//     }
//     location.hash = [minsec[0], "m", minsec[1], "s"].join("");
//     document.getElementById("close").href = location.hash;
//     target = d.getTime() + 1000 * 60 * number;
//     timer();
//   }
// }

// // handles timer
// function timer() {
//   if (looper) {
//     window.clearInterval(looper);
//   }
//   looper = setInterval(function () {
//     var minutes = parseInt(hopper / 60);
//     var display_minutes = minutes;
//     var seconds = parseInt(hopper % 60);
//     if (seconds < 10) {
//       seconds = "0" + seconds;
//     }
//     if (display_minutes < 10) {
//       // display_minutes = "&nbsp;" + display_minutes;
//       display_minutes = "0" + display_minutes;
//     }

//     // console.log(
//     //   [location.hash, hopper, minutes, seconds, "", display_minutes].join(" ")
//     // );

//     // Stop the clock if
//     if (location.hash != '#about') {
//       var time = [display_minutes, seconds].join(":");
//       document.getElementById("minute").innerHTML = display_minutes;
//       document.getElementById("second").innerHTML = seconds;
//       hopper -= 1;
//     }

//     if (hopper < 0) {
//       window.clearInterval(looper);
//       if (AudioContext) {
//         tone.start();
//         setTimeout(function () {
//           tone.stop();
//         }, 500);
//       }
//       // console.log("done");
//     } else if (hopper < 10) {
//       if (AudioContext) {
//         tone.start();
//         setTimeout(function () {
//           tone.stop();
//         }, 50);
//       }
//       document.getElementById("time").className = "";
//       document.getElementById("time").className = "min1";
//     } else {
//       document.getElementById("time").className = "";
//       document.getElementById("time").className = "min5";
//     }

//   }, 1000);
// }
