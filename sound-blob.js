import p5 from "p5";
import "p5/lib/addons/p5.sound";
import "p5/lib/addons/p5.dom";

let sketch = function (p5) {
  let mic, fft, radius, wW, wH;
  p5.setup = () => {
    wW = window.innerWidth;
    wH = window.innerHeight;
    p5.createCanvas(wW, wH);
    if (wW > wH) {
      radius = wH / 3;
    } else {
      radius = wW / 3;
    }
    p5.noFill();
    mic = new p5.AudioIn();
    mic.start();
    p5.getAudioContext().resume();
    fft = new p5.FFT();
    fft.setInput(mic);
  };
  p5.draw = () => {
    p5.background(0, 30);
    p5.translate(wW / 2, wH / 2);
    let waveform = fft.waveform();
    new Polygon(0, 0, waveform, waveform.length);
  };
  class Polygon {
    constructor(xp, yp, amp, npoints) {
      p5.stroke(255);
      let angle = p5.TWO_PI / npoints;
      p5.beginShape();
      for (let a = 0; a < p5.TWO_PI; a += angle) {
        let idx = p5.floor(p5.map(a, 0, p5.TWO_PI, 0, npoints));
        let r = radius + amp[idx] * 200;
        let x = r * p5.cos(a);
        let y = r * p5.sin(a);
        p5.vertex(x, y);
      }
      p5.endShape(p5.CLOSE);
    }
  }
};

new p5(sketch, 'p5canvas');