import p5 from "p5";

let sketch = function(p5) {
    let a, x1, x2, y1, y2, mul, r, wW, wH;
    p5.setup = () => {
      wW = window.innerWidth;
      wH = window.innerHeight;
      p5.createCanvas(wW, wH);
      p5.angleMode(p5.DEGREES);
      p5.background(0);
      p5.stroke(255, 30);
      a = 0;
      if (wW > wH) {
        r = wH / 3;
      } else {
        r = wW / 3;
      }
      mul = p5.random(0.1, 5);
    };
    p5.draw = () => {
      p5.translate(wW / 2, wH / 2);
      x1 = r * p5.cos(a);
      y1 = r * p5.sin(a);
      x2 = r * p5.cos(a * mul);
      y2 = r * p5.sin(a * mul);
      p5.line(x1, y1, x2, y2);
      a += 5;
    };
};

new p5(sketch, 'p5canvas');