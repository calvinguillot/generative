import p5 from "p5";

let sketch = function (p5) {
  p5.disableFriendlyErrors = true; // disables FES
  let xInit, yInit, xOff, yOff, yDir, k;
  let colours = ["#ffb400", "#e58637", "#d6423b", "#b41039", "#420c30"];
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    p5.background(0);
    p5.strokeWeight(5);
    xInit = 30;
    yInit = 20;
    k = 0;
  };
  p5.draw = () => {
    p5.translate(-xInit, 0);
    for (let j = 0; j < window.innerWidth / xInit + xInit; j++) {
      if (j % 2 == 0) {
        yDir = 1;
      } else {
        yDir = -1;
      }
      for (let i = -10; i < window.innerHeight / 5 + yInit; i++) {
        p5.stroke(
          colours[p5.floor(5 * p5.noise(i * j * 0.025, k * 0.05))]
        );
        new Line(
          j * xInit + p5.random(-5, 5),
          i * 5,
          xInit,
          yInit * yDir
        );
      }
    }
    k++;
  };
  class Line {
    constructor(x, y, x0, y0) {
      p5.line(x, y, x + x0, y + y0);
    }
  }

};

new p5(sketch, 'p5canvas');