import p5 from "p5";

let sketch = function(p5) {
    let amp, inc, res;
    let yOff = 0;
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
      p5.background(0);
      p5.noFill();
      amp = p5.random(0.25, 0.75);
      res = p5.random(0.0005, 0.005);
      inc = 0;
    };
    p5.draw = () => {
      if (inc > window.innerHeight / 2 + 100) {
        p5.noLoop();
      }

      p5.beginShape();
      p5.stroke(250, 0, 0, 20);
      let xOff = 0;
      for (let xM = 0; xM < window.innerWidth; xM++) {
        let yM =
          p5.noise(xOff, yOff) * (window.innerHeight * amp) +
          (window.innerHeight * ((1 - amp) / 2) + inc);
        p5.vertex(xM, yM);
        xOff += res;
      }
      p5.endShape();
      yOff += 0.001;
      inc += 0.25;
    };
};

new p5(sketch, 'p5canvas');