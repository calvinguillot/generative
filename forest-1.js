import p5 from "p5";

let sketch = function (p5) {
  let segments, bMax, inc, x, lW, wW, wH, a;

  p5.setup = () => {
    wW = window.innerWidth;
    wH = window.innerHeight;
    p5.createCanvas(wW, wH);
    p5.background("#3a4f74");
    p5.frameRate(12);
    p5.angleMode(p5.DEGREES);
    x = 0;
    segments = p5.floor(p5.random(1, 15));
    bMax = p5.floor(p5.random(0, 10));
    lW = p5.floor(p5.random(1, 5));
    a = p5.floor(p5.random(1, 89));
  };
  p5.draw = () => {
    if (x > wW) {
      p5.noStroke();
      p5.fill(58, 79, 116, 100);
      p5.rect(0, 0, wW, wH);
      x = 0;
    }
    inc = p5.random(50, 150);
    p5.strokeWeight(lW);
    new Tree(segments, x);
    x += inc;
  };
  class Tree {
    constructor(s, x) {
      let y = wH / s;
      let segs = [];
      // Segments
      for (let i = 0; i < s + 1; i++) {
        segs.push(p5.floor(y * i));
      }
      // Random Inner Values
      for (let i = 1; i < segs.length - 1; i++) {
        segs[i] = p5.floor(segs[i] + p5.random(-y / 2, y / 2));
      }
      // Render Line
      for (let i = 1; i < segs.length; i++) {
        p5.stroke(255);
        p5.line(x, segs[i - 1], x, segs[i]);
        new Branch(x, segs[i], p5.random(20, 100), 0);
      }
    }
  }

  class Branch {
    constructor(initX, initY, len, iter) {
      iter++;
      // Direction
      let dir = p5.floor(p5.random(0, 2)) * 2 - 1;
      let x1 = dir * len * p5.cos(a) + initX;
      let y1 = -len * p5.sin(a) + initY;
      // Render Branch
      p5.line(initX, initY, x1, y1);
      p5.line(x1, y1, x1, y1 - len * 0.75);
      if (iter < bMax) {
        new Branch(x1, y1, len * 0.66, iter);
      }
    }
  }

};

new p5(sketch, 'p5canvas');