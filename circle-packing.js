import p5 from "p5";

let sketch = function(p5) {
  let circles = [];
  let minR, maxR, num, tries, maxLoops, colourH, offset,wW,wH;
  p5.setup = () => {
    wW = window.innerWidth;
    wH = window.innerHeight;
    p5.createCanvas(wW, wH);
    p5.background(255);
    p5.colorMode(p5.HSB);
    p5.strokeWeight(2);
    p5.noStroke();
    minR = 2;
    maxR = p5.random(50, 200);
    num = 50;
    tries = 500;
    maxLoops = 0;
    colourH = p5.random(0, 360);
    offset = p5.random(1, 2);
  };
  p5.draw = () => {
    for (let j = 0; j < num; j++) {
      p5.fill(colourH + maxLoops * 3, 50, 100);
      newCircle();
    }
    maxLoops++;
    if (maxLoops > 100) {
      p5.noLoop();
    }
  };
  function newCircle() {
    let circle;
    let safe = false;
    for (let i = 0; i < tries; i++) {
      circle = {
        x: p5.floor(p5.random(wW)),
        y: p5.floor(p5.random(wH)),
        radius: minR / 2
      };
      if (collider(circle)) {
        continue;
      } else {
        safe = true;
        break;
      }
    }
    if (!safe) {
      return;
    }
    for (var r = minR; r < maxR; r++) {
      circle.radius = r;
      if (collider(circle)) {
        circle.radius--;
        break;
      }
    }

    circles.push(circle);
    p5.ellipse(circle.x, circle.y, circle.radius * offset);
  }

  function collider(c) {
    for (var i = 0; i < circles.length; i++) {
      var nextC = circles[i];
      var sum = c.radius + nextC.radius;
      var x = c.x - nextC.x;
      var y = c.y - nextC.y;

      if (sum >= p5.sqrt(x * x + y * y)) {
        return true;
      }
    }
    if (c.x + c.radius >= wW || c.x - c.radius <= 0) {
      return true;
    }
    if (c.y + c.radius >= wH || c.y - c.radius <= 0) {
      return true;
    }
    return false;
  }
};

new p5(sketch, 'p5canvas');