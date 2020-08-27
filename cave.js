import p5 from "p5";

let n = 560;
let colourHEX = [];
let colourRGB = [];
var rainbow = new Rainbow();
rainbow.setNumberRange(1, n);
rainbow.setSpectrum("#440154", "#228b8d", "#f8e621");

for (var i = 0; i < n; i++) {
  var hexColour = rainbow.colourAt(i);
  colourHEX.push(`${hexColour}`);
}
colourHEX.reverse();

function hexToRgb(hex) {
  var int = parseInt(hex, 16);
  var r = (int >> 16) & 255;
  var g = (int >> 8) & 255;
  var b = int & 255;
  return [r, g, b];
}

for (var i = 0; i < colourHEX.length; i++) {
  colourRGB.push(hexToRgb(colourHEX[i]));
}

let sketch = function (p5) {


  let x, y, r, ngon, xoff, yoff, offnum;
  let noiseV = 0;
  let phase = 0;
  let zf = 0;
  let iters = 0;
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    p5.background(0);
    p5.noFill();
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
    r = -50;
    xoff = 0;
    yoff = 0;
    offnum = p5.random(-0.5, 0.5);
    ngon = p5.random(3, 100);
    noiseV = p5.random(0.5, 4.0);
  };
  p5.draw = () => {
    if (r > 500) {
      p5.noLoop();
    }

    p5.stroke(
      colourRGB[iters][0],
      colourRGB[iters][1],
      colourRGB[iters][2]
    );
    new Polygon(x + xoff, y + yoff, r, ngon);
    xoff += offnum;
    yoff += offnum;
    r++;
    zf += 0.1;
    iters++;
  };
  class Polygon {
    constructor(xp, yp, radius, npoints) {
      let angle = p5.TWO_PI / npoints;
      p5.beginShape();
      for (let a = 0; a < p5.TWO_PI; a += angle) {
        let xf = p5.map(p5.cos(a), -1, 1, 0, noiseV);
        let yf = p5.map(p5.sin(a), -1, 1, 0, noiseV);
        let sr = radius + p5.map(p5.noise(xf, yf, zf), 0, 1, 0, 100);
        let sx = xp + p5.cos(a) * sr;
        let sy = yp + p5.sin(a) * sr;
        p5.vertex(sx, sy);
      }
      p5.endShape(p5.CLOSE);
    }
  }
};

new p5(sketch, 'p5canvas');