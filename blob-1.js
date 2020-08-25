import p5 from "p5";

let sketch = function (p5) {
  let x = [];
  let y = [];
  let r = [];
  let zf, noiseV, max;
  let colours = [
    "#96ceb4cc",
    "#ffeeadcc",
    "#d9534fcc",
    "#ffad60cc",
    "#5bc0decc",
    "#fffaddcc",
    "#ffab8fcc",
    "#f2422ecc",
    "#159598cc",
    "#08777acc"
  ];
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    zf = 0;
    noiseV = 0.5;
    max = p5.floor(p5.random(2, 10));
    p5.noStroke();
    for (let i = 0; i < max; i++) {
      x.push(p5.random(0, window.innerWidth));
      y.push(p5.random(0, window.innerHeight));
      r.push(p5.random(20, 150));
    }
  };
  p5.draw = () => {
    p5.background("#f9fff6");
    for (let i = 0; i < max; i++) {
      new Polygon(x[i], y[i], r[i], zf * (0.5 * i + 1), colours[i]);
    }
    zf += 0.01;
  };
  class Polygon {
    constructor(xp, yp, radius, zn, c) {
      p5.fill(c);
      let angle = p5.TWO_PI / 50;
      p5.beginShape();
      for (let a = 0; a < p5.TWO_PI; a += angle) {
        let xf = p5.map(p5.cos(a), -1, 1, 0, noiseV);
        let yf = p5.map(p5.sin(a), -1, 1, 0, noiseV);
        let sr = radius + p5.map(p5.noise(xf, yf, zn), 0, 1, 0, 100);
        let sx = xp + p5.cos(a) * sr;
        let sy = yp + p5.sin(a) * sr;
        p5.vertex(sx, sy);
      }
      p5.endShape(p5.CLOSE);
    }
  }
};

new p5(sketch, 'p5canvas');