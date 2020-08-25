import p5 from "p5";

let sketch = function(p5) {
  let x, y, max, scales, iterN, iterX, iterY, xOff, yOff;
  let wW = window.innerWidth;
  let wH = window.innerHeight;
  let colours = ["#397fc4", "#00a17e", "#f7be16"];
  p5.setup = () => {
    p5.createCanvas(wW, wH);
    iterX = p5.floor(wW / 150);
    iterY = p5.floor(wH / 150);
    xOff = (wW - (iterX * 150 - 150)) / 2;
    yOff = (wH - (iterY * 150 - 150)) / 2;
    p5.colorMode(p5.HSB);
    p5.angleMode(p5.DEGREES);
    p5.background(0);
    p5.noStroke();
    iterN = 0;
    colours = [];
    scales = [];
    for (let i = 0; i < iterX; i++) {
      colours[i] = new Array();
      scales[i] = new Array();
      for (let j = 0; j < iterY; j++) {
        colours[i].push(p5.random(300));
        scales[i].push(p5.random(0.5, 1, 5));
      }
    }
    max = p5.random(20, 150);
  };
  p5.draw = () => {
    if (iterN > max) {
      p5.noLoop();
    }
    for (let i = 0; i < iterX; i++) {
      for (let j = 0; j < iterY; j++) {
        p5.push();
        p5.translate(150 * i + xOff, 150 * j + yOff);
        p5.scale(scales[i][j]);
        new Flower(colours[i][j]);
        p5.pop();
      }
    }
    iterN++;
  };
  class Flower {
    constructor(c) {
      new Petal(c);
      new Stamen(c + 180);
    }
  }

  class Petal {
    constructor(c) {
      let pW = p5.random(15, 25);
      let pH = p5.random(40, 60);
      p5.fill(p5.random(c, c + 60), 25, 95, p5.random(0.05, 0.25));
      p5.push();
      p5.rotate(p5.random(0, 360));
      p5.ellipse(0, -pH / 2, pW, pH);
      p5.pop();
    }
  }
  class Stamen {
    constructor(c) {
      for (let i = 0; i < 10; i++) {
        let sS = p5.random(2, 5);
        p5.fill(p5.random(c, c + 20), 30, 90, p5.random(0.2, 0.5));
        p5.push();
        p5.rotate(p5.random(0, 360));
        p5.ellipse(0, p5.random(sS * 5), sS);
        p5.pop();
      }
    }
  }
};

new p5(sketch, 'p5canvas');