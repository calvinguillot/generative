import p5 from "p5";

let sketch = function (p5) {
  let colours = ["#ffcb21", "#ffffff", "#537bbe", "#e44240"];
  let x, y, x1, y1, stepX, stepY;
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    p5.background(255);
    p5.stroke(0);
    p5.strokeWeight(7);
    x = 0;
    y = 0;
    stepX = p5.floor(p5.random(5, 8));
    stepY = p5.floor(p5.random(4, 7));
    x1 = window.innerWidth / stepX;
    y1 = window.innerHeight / stepY;
    p5.frameRate(1);
  };
  p5.draw = () => {
    p5.fill(255);
    p5.rect(0, 0, window.innerWidth, window.innerHeight);
    create();
  };
  function create() {
    for (let i = 0; i < stepX * stepY; i++) {
      p5.fill(p5.random(colours));
      let a = x + x1 * p5.floor(p5.random(0, stepX - 1));
      let b = y + y1 * p5.floor(p5.random(0, stepY - 1));
      let c = x1 * p5.floor(p5.random(1, stepX - 1));
      let d = y1 * p5.floor(p5.random(1, stepY - 1));
      p5.rect(a, b, c, d);
    }
  }
};

new p5(sketch, 'p5canvas');