import p5 from "p5";

let sketch = function (p5) {
  let step, yOff, zOff, noiseV, radius, wW, wH;
  p5.setup = () => {
    wW = window.innerWidth;
    wH = window.innerHeight;
    p5.createCanvas(wW, wH);
    p5.background(220);
    p5.noFill();
    yOff = -wH / 2 + 100;
    zOff = 0;
    step = p5.random(0.5, 5);
    noiseV = p5.random(0.1, 5);
    radius = 10;
  };
  p5.draw = () => {
    p5.translate(wW / 2, wH / 2);
    p5.stroke(yOff, 100);
    new Polygon(yOff, radius, 500);
    zOff += 0.01;
    yOff += step;
    if (yOff > wH / 2 - 100) p5.noLoop();
  };
  class Polygon {
    constructor(y0, r, npoints) {
      let angle = p5.TWO_PI / npoints;
      p5.beginShape();
      for (let a = 0; a < p5.TWO_PI; a += angle) {
        let xf = p5.map(p5.cos(a), -1, 1, 0, noiseV);
        let yf = p5.map(p5.sin(a), -1, 1, 0, noiseV);
        let sr = r + p5.map(p5.noise(xf, yf, zOff), 0, 1, 0, 100);
        let sx = 4 * p5.cos(a) * sr;
        let sy = y0 + 1 * p5.sin(a) * sr;
        p5.vertex(sx, sy);
      }
      p5.endShape(p5.CLOSE);
    }
  }
};

new p5(sketch, 'p5canvas');