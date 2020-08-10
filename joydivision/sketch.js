// Joy Division Sketch
import p5 from "p5";

let sketch = function(p5) {
  let divs = [];
  let xOff, yOff, wW, wH;
  p5.setup = () => {
    wW = window.innerWidth;
    wH = window.innerHeight;
    p5.createCanvas(wW, wH);
    p5.fill(0);
    p5.stroke(255);
    p5.strokeWeight(2);
    if (wW > wH) {
      xOff = (wH - 300) / 2
    } else {
      xOff = 100
    }
    yOff = (wH - 400) / 2;
    for (let i = 0; i < 40; i++) {
      divs.push(
        new Division(
          xOff,
          10 + yOff + i * 10,
          wW - (2 * xOff),
          300,
          p5.random(4, 10),
          p5.random(0.001, 0.01),
          p5.random(-0.5, 0.5),
          p5.random(1, 3),
          i
        )
      );
    }
  };
  p5.draw = () => {
    p5.background(0);
    for (const d of divs) {
      d.show();
    }
  };
  class Division {
    constructor(
      xInit,
      yInit,
      wSize,
      hSize,
      range,
      nMul,
      mean,
      variance,
      iter
    ) {
      this.xInit = xInit;
      this.yInit = yInit;
      this.wSize = wSize;
      this.hSize = hSize;
      this.range = range;
      this.nMul = nMul;
      this.mean = mean;
      this.variance = variance;
      this.iter = iter;
    }
    show() {
      p5.beginShape();
      for (let i = 0; i < this.wSize; i++) {
        let x = p5.map(i, 0, this.wSize, -this.range, this.range);
        let y = Gaussian(x, this.mean, this.variance);
        let gValue = p5.map(y, 0, 1, 0, this.hSize);
        let n =
          p5.noise(
            i * this.nMul,
            i * 0.01 + p5.frameCount * 0.02,
            this.iter
          ) * gValue;
        p5.vertex(this.xInit + i, this.yInit - n);
      }
      p5.endShape();
    }
  }

  function Gaussian(x, mean, variance) {
    return (
      (1 / p5.sqrt(p5.TWO_PI * variance)) *
      p5.exp(-p5.sq(x - mean) / (2 * variance))
    );
  }
};

new p5(sketch, 'p5canvas');
