import p5 from "p5";

let sketch = function(p5) {
    let angle, wSize, rSize, wW, wH;
    p5.setup = () => {
      wW = window.innerWidth;
      wH = window.innerHeight;
      p5.createCanvas(wW, wH);
      p5.background(0);
      p5.angleMode(p5.DEGREES);
      p5.noStroke();
      if (wW > wH) {
        wSize = wW;
      } else {
        wSize = wH;
      }
      angle = 0;
      rSize = 50;
    };
    p5.draw = () => {
      p5.fill(0, 20);
      p5.rect(0, 0, wW, wH);
      p5.translate(wW / 2, wH / 2);
      p5.rotate(p5.noise(angle * 0.005) * 360);
      p5.noFill();
      p5.stroke(255);
      for (let i = -wSize; i < wSize; i += 100) {
        for (let j = -wSize; j < wSize; j += 100) {
          p5.rect(
            -(rSize / 2) + i,
            -(rSize / 2) + j,
            rSize - p5.abs(i / 20),
            rSize - p5.abs(j / 20),
            20
          );
        }
      }
      rSize += p5.sin(angle) * 3;
      angle++;
    };
};

new p5(sketch, 'p5canvas');