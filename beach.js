import p5 from "p5";

let sketch = function (p5) {
  p5.disableFriendlyErrors = true; // disables FES
  let colours = [
    "#075C81",
    "#017582",
    "#009889",
    "#02B28C",
    "#FFFFFF",
    "#DBDDAC"
  ];
  let size, h, k;
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    p5.noStroke();
    p5.frameRate(5);
    k = 0;
    size = 10;
    h = window.innerHeight / size;
  };
  p5.draw = () => {
    for (let i = 0; i < window.innerWidth / size; i++) {
      for (let j = 0; j < h; j++) {
        p5.fill(colours[Col(j, p5.noise(k) * 10)]);
        p5.ellipse(
          i * size + p5.random(-10, 10),
          j * size + p5.random(-10, 10),
          size * p5.random(-2, 2)
        );
      }
    }
    k += 0.05;
  };
  function Col(j, a) {
    let c;
    if (j < h / colours.length + p5.random(-6, 6) + p5.sin(a) * 2) {
      c = 0;
    } else if (
      j <
      (h / colours.length) * 2 + p5.random(-6, 6) + p5.sin(a) * 2
    ) {
      c = 1;
    } else if (
      j <
      (h / colours.length) * 3 + p5.random(-6, 6) + p5.sin(a) * 2
    ) {
      c = 2;
    } else if (
      j <
      (h / colours.length) * 4 + p5.random(-6, 6) + p5.sin(a) * 2
    ) {
      c = 3;
    } else if (
      j <
      (h / colours.length) * 5 + p5.random(-1, 3) + p5.sin(a) * 4
    ) {
      c = 4;
    } else {
      c = 5;
    }
    return c;
  }
};

new p5(sketch, 'p5canvas');