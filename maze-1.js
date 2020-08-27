import p5 from "p5";

let sketch = function (p5) {
  let step, n;
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    p5.background(255);
    p5.stroke(0);
    p5.strokeWeight(3);
    step = p5.floor(p5.random(10, 50));
    n = 0;
  };
  p5.draw = () => {
    p5.background(255, 50);
    for (let i = 0; i < window.innerWidth; i += step) {
      for (let j = 0; j < window.innerHeight; j += step) {
        let dir = p5.noise(i, j, n);
        if (dir > 0.5) {
          p5.line(i, j, i + step, j + step);
        } else {
          p5.line(i + step, j, i, j + step);
        }
      }
    }
    n += 0.02;
  };
};

new p5(sketch, 'p5canvas');