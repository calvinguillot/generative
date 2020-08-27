import p5 from "p5";

let sketch = function (p5) {
  let res = 20;
  let lines = 100;
  let yOff = 0;
  let xOffMul, wW, wH;
  p5.setup = () => {
    wW = window.innerWidth;
    wH = window.innerHeight;
    p5.createCanvas(wW, wH);
    p5.noStroke();
    xOffMul = p5.random(0.0002, 0.002)
  };
  p5.draw = () => {
    p5.background(220);
    for (let i = 0; i < 5; i++) {
      p5.fill(255, 20 - i * 5);
      p5.ellipse(wW - 100, 100, 100 + i * 10);
    }
    for (let j = 0; j < lines; j++) {
      p5.fill(100, 5);
      p5.beginShape();
      p5.vertex(0, wH);
      for (let i = 0; i - res < wW; i += res) {
        let n =
          p5.noise((i + p5.frameCount) * xOffMul, yOff, p5.frameCount * 0.01) * 400;
        p5.vertex(i, wH / 2 + j * 5 + n - 200);
      }
      p5.vertex(wW, wH);
      p5.endShape(p5.CLOSE);
      yOff += 0.05;
    }
    yOff = 0;
  };
};

new p5(sketch, 'p5canvas');