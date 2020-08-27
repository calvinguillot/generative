import p5 from "p5";

let sketch = function (p5) {
  let rW, rH, wOff, hOff, wW, wH;
  p5.setup = () => {
    wW = window.innerWidth;
    wH = window.innerHeight;
    p5.createCanvas(wW, wH);
    p5.background(0);
    p5.colorMode(p5.HSB);
    rW = p5.random(10, 20);
    rH = p5.random(50, 100);
    wOff = wW;
    hOff = p5.random(50, 500);
  };
  p5.draw = () => {
    let h = p5.random(20, 60);
    let a = p5.random(0, 0.4);
    new Rectangle(p5.random(wW), p5.random(-rH, wH), h, a);
    if (p5.frameCount > 200) {
      p5.noLoop();
    }
  };
  class Rectangle {
    constructor(w0, h0, deg, alp) {
      for (let j = 0; j < rW; j++) {
        p5.stroke(deg, 100, 100, alp);
        p5.line(w0 + j, h0, w0 + j, h0 + rH);
      }
      for (let i = 0; i < wOff; i++) {
        let d = p5.map(i, 0, wOff, 0, 40);
        let hInc = hOff / wOff;
        p5.strokeWeight(3);
        p5.stroke(deg - d, 100, 66, alp);
        p5.line(w0 - i, h0 + i * hInc, w0 - i, h0 + rH + i * hInc);
        p5.stroke(deg - d, 100, 33, alp);
        p5.line(
          w0 - i,
          h0 + i * hInc + rH,
          w0 - i + rW,
          h0 + rH + i * hInc
        );
      }
    }
  }

};

new p5(sketch, 'p5canvas');