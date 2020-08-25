import p5 from "p5";

let sketch = function (p5) {
  p5.disableFriendlyErrors = true; // disables FES
  let r = 20;
  let dr = 20;
  let x = null;
  let y = null;
  let max = 0;
  let rPos = 1;
  let colours = [
    "#011f4bCC",
    "#03396cCC",
    "#005b96CC",
    "#6497b1CC",
    "#b3cde0cc"
  ];

  let colours2 = ["#ffd27dB3", "#e15b6cB3", "#87AEADB3", "#0D3B54B3"];
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    p5.background(0);
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
    if (x * 2 > y * 2) {
      max = x * 2;
    } else max = y * 2;
    rPos = p5.random(2 / max, 2);
  };
  p5.draw = () => {
    if (r < max * 2.5) {
      p5.noFill();
      p5.strokeWeight(p5.random(1, 5));
      p5.stroke(p5.random(colours));
      p5.arc(
        x * rPos,
        y * rPos,
        r,
        r,
        p5.random(p5.TWO_PI),
        p5.random(p5.TWO_PI)
      );

      p5.push();
      p5.translate(x * rPos, y * rPos);
      p5.rotate(p5.random(p5.TWO_PI));
      p5.stroke(p5.random(colours2));
      p5.line(r * 0.95, r * 0.95, r, r);
      p5.pop();

      r = r + 5;
    } else {
      p5.noLoop();
    }

    p5.beginShape();
    p5.stroke(0);
    p5.strokeWeight(2);
    p5.fill(0);
    let xOff = 0;
    p5.vertex(-10, window.innerHeight);
    for (let xM = -100; xM < window.innerWidth + 10; xM++) {
      let yM =
        p5.noise(xOff) * (window.innerHeight * 0.25) +
        window.innerHeight * 0.65;
      p5.vertex(xM, yM);
      xOff += 0.01;
    }
    p5.vertex(window.innerWidth + 10, window.innerHeight);
    p5.endShape();
  };
};

new p5(sketch, 'p5canvas');