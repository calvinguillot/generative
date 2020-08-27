import p5 from "p5";

let sketch = function (p5) {
  let w = 25;
  let xInit, yInit;
  let max = 0;

  let colours = [
    "#E2EF97",
    "#FEE072",
    "#FDB758",
    "#FF9A55",
    "#F28C44",
    "#F1814F",
    "#EE6C6E",
    "#C37978",
    "#00817F",
    "#00ADA3",
    "#03D7C0",
    "#66F4C6",
    "#72C496",
    "#336F3C",
    "#0E4410"
  ];
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    p5.background("#ffeecc");
    xInit = 0;
    yInit = 0;
    p5.noStroke();
  };
  p5.draw = () => {
    if (max > colours.length - 2) {
      p5.noLoop();
    }
    for (let i = 0; i < window.innerWidth / w + 5; i++) {
      let y0 = yInit + p5.random(20, 150);
      new volume(
        xInit + i * w + p5.random(0, 100),
        y0,
        window.innerHeight,
        colours[max]
      );
    }
    yInit += p5.random(0, 70);
    xInit -= w / 2;
    max++;
  };
  class volume {
    constructor(x, y, y0, c) {
      p5.fill(c);
      p5.rect(x, y, w, y0);
      p5.fill(0, 75);
      p5.beginShape();
      p5.vertex(x + w, y);
      p5.vertex(x + 1.5 * w, y + 0.5 * w);
      p5.vertex(x + 1.5 * w, y + y0);
      p5.vertex(x + w, y + y0);
      p5.endShape(p5.CLOSE);
    }
  }

};

new p5(sketch, 'p5canvas');