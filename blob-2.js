import p5 from "p5";

let sketch = function(p5) {
    let noiseV, res, wW, wH;
    let zf = 0;
    p5.setup = () => {
      wW = window.innerWidth;
      wH = window.innerHeight;
      p5.createCanvas(wW, wH, p5.WEBGL);
      p5.colorMode(p5.HSB);
      p5.strokeWeight(3);
      p5.stroke(p5.random(200,300), 100, 80)
      p5.noFill();
      noiseV = p5.random(1, 5);
      res = p5.floor(p5.random(10, 40));
    };
    p5.draw = () => {
      p5.background(55, 10, 100);
      p5.orbitControl();
      for (let i = -1; i < res; i++) {
        let theta = (p5.PI / res) * (i + 1);
        let r = p5.sin(theta) * 200;
        let z = p5.cos(theta) * 200;
        new Circle(z, r, 100, i);
        zf += 0.001;
      }
    };
    class Circle {
      constructor(zp, radius, npoints, it) {
        let angle = p5.TWO_PI / npoints;
        p5.beginShape();
        for (let a = 0; a < p5.TWO_PI; a += angle) {
          let xf = p5.map(p5.cos(a), -1, 1, 0, noiseV);
          let yf = p5.map(p5.sin(a), -1, 1, 0, noiseV);
          let sr =
            radius + p5.map(p5.noise(xf, yf, zf + it / 100), 0, 1, -10, 50);
          let sx = p5.cos(a) * sr;
          let sy = p5.sin(a) * sr;
          let sz = p5.map(p5.noise(xf, yf, zf + zp / 150), 0, 1, -50, 50);
          p5.vertex(sx, sy, zp + sz);
        }
        p5.endShape(p5.CLOSE);
      }
    }
};

new p5(sketch, 'p5canvas');