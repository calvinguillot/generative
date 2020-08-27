import p5 from "p5";

let sketch = function (p5) {
  let zOff, size, inc, noiseRes, wW, wH;
  p5.setup = () => {
    wW = window.innerWidth;
    wH = window.innerHeight;
    p5.createCanvas(wW, wH);
    p5.background("#3a4f74");
    p5.colorMode(p5.HSB);
    p5.noStroke();
    size = 10;
    zOff = 0;
    inc = p5.random(0.01, 0.1);
    noiseRes = p5.random(25, 100);
  };
  p5.draw = () => {
    p5.background(0);
    p5.translate(size / 2, size / 2);
    for (let i = 0; i < wW; i += size) {
      for (let j = 0; j < wH; j += size) {
        let n = p5.noise(i / noiseRes, j / noiseRes, zOff);
        p5.fill(0, 100, p5.floor(p5.map(n, 0, 1, 0, 5) + 1) * 20);
        p5.ellipse(i, j, size);
      }
    }
    zOff += inc;
  };

};

new p5(sketch, 'p5canvas');