import p5 from "p5";

let sketch = function(p5) {
  let a, b, zOff, nV, fr, iterX, iterY, xOff, yOff;
  let size = 30;
  let wW = window.innerWidth;
  let wH = window.innerHeight;
  p5.setup = () => {
    p5.createCanvas(wW, wH);
    p5.angleMode(p5.DEGREES);
    p5.background(0);
    iterX = p5.floor(wW / (size * 4));
    iterY = p5.floor(wH / (size * 4));
    xOff = (wW- (iterX - 1) * size * 4) / 2;
    yOff = (wH - (iterY - 1) * size * 4) / 2;
    fr = 60;
  };
  p5.draw = () => {
    if (fr < 2) {
      p5.noLoop();
    }
    p5.frameRate(fr);
    p5.noStroke();
    p5.fill(0, 150);
    p5.rect(0, 0, wW, wH);
    p5.stroke(255);
    p5.noFill();
    for (let i = 0; i < iterX; i++) {
      for (let j = 0; j < iterY; j++) {
        a = p5.floor(p5.random(1, 5));
        b = p5.floor(p5.random(1, 5));
        if (a == b) {
          b += 1;
        }
        p5.push();
        p5.translate(i * size * 4 + xOff, j * size * 4 + yOff);
        new Curve(a, b);
        p5.pop();
      }
    }
    fr--;
  };
  class Curve {
    constructor(a0, b0) {
      p5.beginShape();
      for (let i = 0; i < 360; i++) {
        p5.vertex(
          p5.sin(a0 * i) * size + p5.random(-1, 1),
          p5.sin(b0 * i) * size + p5.random(-1, 1)
        );
      }
      p5.endShape();
    }
  }
};

new p5(sketch, 'p5canvas');