import p5 from "p5";

let sketch = function(p5) {
  let iterX, iterY, xOff, yOff, fr;
  let wW = window.innerWidth;
  let wH = window.innerHeight;
  let colours = ["#397fc4", "#00a17e", "#f7be16"];
  p5.setup = () => {
    p5.createCanvas(wW, wH);
    iterX = p5.floor(wW / 100);
    iterY = p5.floor(wH / 100);
    xOff = (wW - (iterX * 100 - 40)) / 2;
    yOff = (wH - (iterY * 100 - 120)) / 2;
    p5.strokeWeight(10);
    fr = 60;
  };
  p5.draw = () => {
    if (fr < 2) {
      p5.noLoop();
    }
    p5.background("#293462");
    p5.frameRate(fr);
    let tempX = xOff;
    let tempY = yOff;

    for (let i = 0; i < iterX; i++) {
      for (let j = 0; j < iterY; j++) {
        p5.stroke(colours[p5.floor(p5.random(0, colours.length))]);
        p5.strokeWeight(10);
        new Glyph(tempX, tempY);
        tempY += 100;
      }
      tempX += 100;
      tempY = yOff;
    }
    tempX = xOff;
    fr--;
  };
  class Glyph {
    constructor(x, y) {
      let points = new Array();
      for (let j = 0; j < 4; j++) {
        p5.line(x, y, x, y - p5.floor(p5.random(0, 40)));
        points.push([x, y]);
        x += 20;
      }
    }
  }
};

new p5(sketch, 'p5canvas');