import p5 from "p5";
import "p5/lib/addons/p5.sound";
import "p5/lib/addons/p5.dom";

let sketch = function(p5) {
    let mic, fft, a, wW, wH;
    p5.setup = () => {
      wW = window.innerWidth;
      wH = window.innerHeight;
      p5.createCanvas(wW, wH);
      p5.angleMode(p5.DEGREES);
      p5.background(0);
      p5.stroke(255, 200);
      p5.noFill();
      mic = new p5.AudioIn();
      mic.start();
     p5. getAudioContext().resume();
      fft = new p5.FFT();
      fft.setInput(mic);
      a = -10;
    };
    p5.draw = () => {
      p5.translate(0, a);
      let spectrum = fft.analyze();
      p5.beginShape();
      for (let i = 0; i < wW / 2; i++) {
        if (spectrum[i] !== 0) p5.vertex(i * 4, -spectrum[i] / 4);
      }
      p5.endShape();
      if (a > wH + 10) {
        p5.background(0);
        a = 0;
      } else {
        a += 2;
      }
    };
};

new p5(sketch, 'p5canvas');