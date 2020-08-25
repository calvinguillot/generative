import p5 from "p5";

let sketch = function(p5) {
  let particles = [];
  let colours = [];
  let nums, mult, noiseV, col, wW, wH;
  p5v.setup = () => {
    wW = window.innerWidth;
    wH = window.innerHeight;
    p5v.createCanvas(wW, wH);
    p5v.colorMode(p5v.HSB);
    p5v.background(p5v.random(360), 30, 20);
    p5v.strokeWeight(5);
    nums = p5v.floor(200, 1000);
    mult = p5v.floor(p5v.random(1, 5));
    noiseV = 1000 * mult;
    col = p5v.random(300);
    for (let i = 0; i < nums; i++) {
      colours.push(p5v.random(col, col + 80));
      particles.push(new Particle());
    }
  };
  p5v.draw = () => {
    let i = 0;
    for (const p of particles) {
      p5v.stroke(colours[i], 80, 80);
      p.move();
      p.edges();
      p.show();
      i++;
    }
  };
  class Particle {
    constructor() {
      this.dir = p5v.createVector(0, 0);
      this.vel = p5v.createVector(0, 0);
      this.pos = p5v.createVector(p5v.random(0, wW), p5v.random(0, wH));
      this.speed = 0.4;
    }
    move() {
      var a =
        p5v.noise(this.pos.x / noiseV, this.pos.y / noiseV) *
        p5v.TWO_PI *
        noiseV;
      this.dir.x = p5v.cos(a);
      this.dir.y = p5v.sin(a);
      this.vel = this.dir.copy();
      this.vel.mult(this.speed);
      this.pos.add(this.vel);
    }
    edges() {
      if (
        this.pos.x > wW ||
        this.pos.x < 0 ||
        this.pos.y > wH ||
        this.pos.y < 0
      ) {
        this.pos.x = p5v.random(1, wW - 1);
        this.pos.y = p5v.random(1, wH - 1);
      }
    }
    show() {
      p5v.point(this.pos.x, this.pos.y);
    }
  }
};

new p5(sketch, 'p5canvas');