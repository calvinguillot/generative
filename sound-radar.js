import p5 from "p5";
import "p5/lib/addons/p5.sound";
import "p5/lib/addons/p5.dom";

let sketch = function(p5) {
    let mic, fft, radius, wW, wH;
    let a = 0;
    p5.setup = () => {
      wW = window.innerWidth;
      wH = window.innerHeight;
      p5.createCanvas(wW, wH);
      p5.angleMode(p5.DEGREES);
      p5.background(0);
      p5.stroke(255, 50);
      if (wW > wH) {
        radius = wH / 2.5;
      } else {
        radius = wW / 2.5;
      }
      mic = new p5.AudioIn();
      mic.start();
     p5. getAudioContext().resume();
      fft = new p5.FFT();
      fft.setInput(mic);
    };
    p5.draw = () => {
      p5.translate(wW / 2, wH / 2);
      let spectrum = fft.analyze();
      p5.rotate(a);
      for (let i = 0; i < radius; i++) {
        p5.strokeWeight(spectrum[i] / 30);
        if (spectrum[i] !== 0) p5.point(radius - i, 0);
      }
      if (a > 360) {
        p5.background(0, 200);
        a = 0;
      } else {
        a += 0.5;
      }
    };
};

new p5(sketch, 'p5canvas');