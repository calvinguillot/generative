import p5 from "p5";

let sketch = function (p5) {
  let x, y, w, h, r, rt, sc;
  let max = 0;
  let colours = [
    ["#131689B3", "#5920A5B3", "#8A23A5B3"],
    ["#A72497B3", "#C23C81B3", "#DE5E64B3", "#ED7A52B3"],
    ["#F9973FB3", "#FEBD2AB3", "#F6E826B3"]
  ];

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    p5.background("#e7d3d3");
    p5.noStroke();
    x = window.innerWidth;
    y = window.innerHeight;
  };
  p5.draw = () => {
    if (max > 2000) {
      p5.noLoop();
    }

    r = p5.random(0, 30);
    w = p5.random(0, 30);
    h = p5.random(0, -2000);
    rt = p5.random(0, p5.TWO_PI);
    sc = p5.random(0, 1);

    new Square(
      p5.random(0, x),
      p5.random(0, y),
      p5.random(0, w),
      p5.random(0, h)
    );
    new Circle(
      p5.random(0, x),
      p5.randomGaussian(window.innerHeight * 0.4, 100),
      r
    );
    new Triangle(
      p5.random(0, x),
      p5.randomGaussian(window.innerHeight, 100),
      rt,
      sc
    );

    max++;
  };
  class Square {
    constructor(xr, yr, wr, hr) {
      p5.fill(p5.random(colours[1]));
      p5.rect(xr, yr, wr, hr);
    }
  }
  class Circle {
    constructor(xc, yc, rc) {
      p5.fill(p5.random(colours[2]));
      p5.circle(xc, yc, rc);
    }
  }
  class Triangle {
    constructor(xt, yt, rot, sca) {
      p5.fill(p5.random(colours[0]));
      p5.translate(xt, yt);
      p5.scale(sca);
      p5.rotate(rot);
      p5.triangle(30, 75, 58, 25, 86, 75);
    }
  }
};

new p5(sketch, 'p5canvas');