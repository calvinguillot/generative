import p5 from "p5";

let sketch = function(p5) {
  let yOff, zOff, numB, hue, wW, wH;
  let xInit = [];
  let yInit = [];
  let speeds = [];
  let steps = [];
  let strokes = [];
  let offArr = [];
  let colours = [];
  p5.setup = () => {
    wW = window.innerWidth;
    wH = window.innerHeight;
    p5.createCanvas(wW, wH);
    p5.colorMode(p5.HSB);
    p5.background(220);
    p5.noFill();
    yOff = 0;
    zOff = 0;
    hue = p5.random(300);
    numB = 100;
    for (let i = 0; i < numB; i++) {
      xInit.push(p5.random(-100, wW));
    }
    for (let i = 0; i < numB; i++) {
      yInit.push(p5.random(-100, wH));
    }
    for (let i = 0; i < numB; i++) {
      speeds.push(p5.random(0.1, 0.5));
    }
    for (let i = 0; i < numB; i++) {
      colours.push({
        h: hue + 60,
        s: p5.random(60, 90),
        b: p5.random(40, 70),
        a: p5.random(0.05, 0.25)
      });
    }
    for (let i = 0; i < numB; i++) {
      strokes.push(p5.floor(p5.random(1, 50)));
    }
    for (let i = 0; i < strokes.length; i++) {
      steps.push(p5.floor(p5.random(1, 5)));
    }
    for (let i = 0; i < numB; i++) {
      offArr[i] = [];
      for (let j = 0; j < strokes.length; j++) {
        offArr[i].push(p5.random(50));
      }
    }
  };
  p5.draw = () => {
    for (let i = 0; i < numB; i++) {
      p5.stroke(colours[i].h, colours[i].s, colours[i].b, colours[i].a);
      new BrushStroke(
        xInit[i],
        yInit[i] + yOff * speeds[i],
        strokes[i],
        steps[i],
        offArr[i]
      );
    }
    zOff += 0.01;
    yOff++;
    if (yOff > 1000) p5.noLoop();
  };
  class Droplet {
    constructor(x0, y0, zP, wg) {
      p5.strokeWeight(p5.noise(zOff + zP) * wg);
      p5.point(x0, y0);
    }
  }
  class BrushStroke {
    constructor(x, y, n, s, of) {
      for (let i = 0; i < n; i++) {
        new Droplet(x + i * s, y + of[i], i * 5, 10);
      }
    }
  }
};

new p5(sketch, 'p5canvas');