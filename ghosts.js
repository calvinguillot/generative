import p5 from "p5";

let sketch = function (p5) {
  let x0 = [];
  let y0 = [];
  let maxW = [];
  let std = [];
  let colour = [];
  let rects, wW, wH;
  p5.setup = () => {
    wW = window.innerWidth;
    wH = window.innerHeight;
    p5.createCanvas(wW, wH);
    p5.background(0);
    rects = p5.floor(p5.random(2, 8));
    for (let i = 0; i < rects; i++) {
      x0.push(p5.random(0, wW));
      y0.push(p5.random(0, wH));
      maxW.push(p5.random(50, 200));
      std.push(p5.random(50, 150));
      colour.push(255 / i + 50);
    }
  };
  p5.draw = () => {
    p5.fill(0, 25);
    p5.noStroke();
    p5.rect(0, 0, wW, wH);
    for (let i = 0; i < rects; i++) {
      new noiseRect(
        x0[i],
        y0[i] + p5.random(-5, 5),
        maxW[i] + p5.random(-25, 25),
        std[i],
        colour[i]
      );
    }
  };
  class noiseRect {
    constructor(xT, yT, w, s, c) {
      p5.push();
      p5.translate(xT, yT);
      for (let i = 0; i < 1200; i++) {
        let x = p5.random(-w / 2, w / 2);
        let y = p5.randomGaussian();
        y = p5.abs(y * s);
        y = p5.constrain(y, 0, 700);
        p5.stroke(c);
        p5.point(x, y);
      }
      p5.pop();
    }
  }
};

new p5(sketch, 'p5canvas');