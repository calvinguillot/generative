import p5 from "p5";

let sketch = function(p5) {
    let a = 0;
    let inc = 0;
    let aMul = 0;
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
      p5.background(0);
      p5.angleMode(p5.DEGREES);
      p5.strokeWeight(3);
      inc = p5.random(0.0025, 0.0125);
      aMul = p5.random(-100, 100);
    };
    p5.draw = () => {
      if (a > 15) {
        p5.noLoop();
      }
      p5.stroke(255, 50);
      let x = p5.noise(a, 0) * window.innerWidth;
      let y = p5.noise(0, a) * window.innerHeight;
      p5.translate(x, y);
      p5.rotate(a * aMul);
      p5.line(0, 0, 0 + p5.noise(a) * 400, 0);
      p5.resetMatrix();
      a += inc;
    };
};

new p5(sketch, 'p5canvas');