import p5 from "p5";

let sketch = function(p5) {
    let r1, r2, x, y, a, b, i, wW, wH;
    p5.setup = () => {
      wW = window.innerWidth;
      wH = window.innerHeight;
      p5.createCanvas(wW, wH);
      p5.angleMode(p5.DEGREES);
      p5.background(0);
      p5.noFill();
      p5.stroke(255, 15);
      r1 = p5.random(10, 30);
      r2 = p5.random(10, 30);
      a = p5.random(360);
      b = p5.random(360);
      i = p5.random(5, 20);
    };
    p5.draw = () => {
      if (r1 + r2 > 10000) {
        p5.noLoop();
      }
      let x = p5.random(-wH / 3, wH / 3);
      let y = p5.random(-wH / 3, wH / 3);
      p5.translate(wW / 2, wH / 2);
      p5.rotate(a);
      p5.ellipse(r1 / 2, y, r1);
      p5.ellipse(-r2 / 2, y, r2);
      p5.rotate(b);
      p5.ellipse(x, r1 / 2, r1);
      p5.ellipse(x, -r2 / 2, r2);
      r1 += p5.randomGaussian(i, 50);
      r2 += p5.randomGaussian(i, 50);
    };
};

new p5(sketch, 'p5canvas');