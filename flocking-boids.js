import p5 from "p5";

let sketch = function(p5) {
  let flock = [];
  let colours = [
    "#C78342CC",
    "#D3BC4ACC",
    "#B04360CC",
    "#6AA0B2CC",
    "#638A51CC"
  ];
  let coloursBoids = [];
  let sizes = [];
  let quadTree, alignV, cohesionV, separationV, wW, wH;
  p5v.setup = () => {
    wW = window.innerWidth;
    wH = window.innerHeight;
    p5v.createCanvas(wW, wH);
    p5v.strokeWeight(5);
    p5v.angleMode(p5v.DEGREES);
    quadTree = new QuadTree(p5v.Infinity, 30, new Rect(0, 0, wW, wH));
    alignV = 1;
    cohesionV = 1.1;
    separationV = 1.25;
    for (let i = 0; i < 200; i++) {
      flock.push(new Boid());
      coloursBoids.push(p5v.random(colours));
      sizes.push({
        xF: p5v.floor(p5v.random(10, 20)),
        xB: p5v.floor(p5v.random(2, 5)),
        yS: p5v.floor(p5v.random(2, 10))
      });
    }
  };
  p5v.draw = () => {
    let i = 0;
    p5v.background(220);
    quadTree.clear();
    for (const boid of flock) {
      quadTree.addItem(boid.position.x, boid.position.y, boid);
    }
    for (const boid of flock) {
      boid.edges();
      boid.flock();
      boid.update();
      boid.show(coloursBoids[i], sizes[i]);
      i++;
    }
  };
  class Boid {
    constructor() {
      this.position = p5v.createVector(p5v.random(wW), p5v.random(wH));
      // this.velocity = new p5.Vector.random2D();
      let angle = p5v.random(0,90)
      this.velocity = new p5.Vector.fromAngle(
        ((angle + 90) / 180) * p5v.PI - p5v.PI
      );
      this.velocity.setMag(p5v.random(2, 4));
      this.acceleration = p5v.createVector();
      this.maxForce = 0.3;
      this.maxSpeed = 4;
    }
    edges() {
      if (this.position.x > wW) {
        this.position.x = 0;
      } else if (this.position.x < 0) {
        this.position.x = wW;
      }
      if (this.position.y > wH) {
        this.position.y = 0;
      } else if (this.position.y < 0) {
        this.position.y = wH;
      }
    }
    align(boids) {
      let perceptionRadius = 50;
      let perceptionCount = 5;
      let steering = createVector();
      let total = 0;
      for (const other of quadTree.getItemsInRadius(
        this.position.x,
        this.position.y,
        perceptionRadius,
        perceptionCount
      )) {
        steering.add(other.velocity);
        total++;
      }
      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
    separation(boids) {
      let perceptionRadius = 50;
      let perceptionCount = 5;
      let steering = createVector();
      let total = 0;
      for (const other of quadTree.getItemsInRadius(
        this.position.x,
        this.position.y,
        perceptionRadius,
        perceptionCount
      )) {
        const diff = p5.Vector.sub(this.position, other.position);
        const d = diff.mag();
        if (d === 0) continue;
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
    cohesion(boids) {
      let perceptionRadius = 100;
      let perceptionCount = 5;
      let steering = createVector();
      let total = 0;
      for (const other of quadTree.getItemsInRadius(
        this.position.x,
        this.position.y,
        perceptionRadius,
        perceptionCount
      )) {
        steering.add(other.position);
        total++;
      }
      if (total > 0) {
        steering.div(total);
        steering.sub(this.position);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
    flock(boids) {
      let alignment = this.align(boids);
      let cohesion = this.cohesion(boids);
      let separation = this.separation(boids);
      alignment.mult(alignV);
      cohesion.mult(cohesionV);
      separation.mult(separationV);
      this.acceleration.add(alignment);
      this.acceleration.add(cohesion);
      this.acceleration.add(separation);
    }
    update() {
      this.position.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.acceleration.mult(0);
    }
    show(c, s) {
      p5v.push();
      p5v.noStroke();
     p5v.fill(c);
      p5v.translate(this.position.x, this.position.y);
      p5v.rotate(this.velocity.heading());
      p5v.quad(s.xF, 0, 0, -s.yS, s.xB, 0, 0, s.yS);
      p5v.pop();
    }
  }
  class Rect {
    constructor(x = 0, y = 0, width = 1, height = 1) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
    copy() {
      return new Rect(this.x, this.y, this.width, this.height);
    }
  }
  class QuadTreeItem {
    constructor(x, y, data) {
      this.x = x;
      this.y = y;
      this.data = data;
    }
  }
  class QuadTreeBin {
    constructor(maxDepth, maxItemsPerBin, extent, depth = 0) {
      this.rect = extent.copy();
      this.bins = null;
      this.maxDepth = maxDepth;
      this.maxItemsPerBin = maxItemsPerBin;
      this.items = [];
      this.depth = depth;
    }
    checkWithinExtent(x, y, range = 0) {
      return (
        x >= this.rect.x - range &&
        x < this.rect.x + this.rect.width + range &&
        y >= this.rect.y - range &&
        y < this.rect.y + this.rect.height + range
      );
    }
    addItem(item) {
      if (this.bins === null) {
        this.items.push(item);
        if (
          this.depth < this.maxDepth &&
          this.items !== null &&
          this.items.length > this.maxItemsPerBin
        )
          this.subDivide();
      } else {
        const binIndex = this._getBinIndex(item.x, item.y);
        if (binIndex != -1) this.bins[binIndex].addItem(item);
      }
    }
    getItemsInRadius(x, y, radius, maxItems) {
      const radiusSqrd = radius ** 2;
      let items = [];

      if (this.bins) {
        for (let b of this.bins)
          if (b.checkWithinExtent(x, y, radius))
            items.push(...b.getItemsInRadius(x, y, radius, maxItems));
      } else {
        for (let item of this.items) {
          const distSqrd = (item.x - x) ** 2 + (item.y - y) ** 2;
          if (distSqrd <= radiusSqrd)
            items.push({ distSqrd: distSqrd, data: item.data });
        }
      }
      return items;
    }
    subDivide() {
      if (this.bins !== null) return;
      this.bins = [];
      let w = this.rect.width * 0.5,
        h = this.rect.height * 0.5;
      for (let i = 0; i < 4; ++i)
        this.bins.push(
          new QuadTreeBin(
            this.maxDepth,
            this.maxItemsPerBin,
            new Rect(
              this.rect.x + (i % 2) * w,
              this.rect.y + Math.floor(i * 0.5) * h,
              w,
              h
            ),
            this.depth + 1
          )
        );
      for (let item of this.items) {
        const binIndex = this._getBinIndex(item.x, item.y);
        if (binIndex != -1) this.bins[binIndex].addItem(item);
      }
      this.items = null;
    }
    debugRender(renderingContext) {
      noFill();
      stroke("#aaa");
      strokeWeight(1);
      rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
      if (this.bins)
        for (let b of this.bins) b.debugRender(renderingContext);
    }
    _getBinIndex(x, y, range = 0) {
      if (!this.checkWithinExtent(x, y)) return -1;
      let w = this.rect.width * 0.5,
        h = this.rect.height * 0.5;
      let xx = Math.floor((x - this.rect.x) / w);
      let yy = Math.floor((y - this.rect.y) / h);
      return xx + yy * 2;
    }
  }
  class QuadTree {
    constructor(maxDepth, maxItemsPerBin, extent) {
      this.extent = extent.copy();
      this.maxDepth = maxDepth;
      this.maxItemsPerBin = maxItemsPerBin;
      this.clear();
    }
    clear() {
      this.rootBin = new QuadTreeBin(
        this.maxDepth,
        this.maxItemsPerBin,
        new Rect(0, 0, this.extent.width, this.extent.height)
      );
    }
    addItem(x, y, item) {
      this.rootBin.addItem(new QuadTreeItem(x, y, item));
    }
    getItemsInRadius(x, y, radius, maxItems) {
      if (maxItems === undefined) {
        return this.rootBin.getItemsInRadius(x, y, radius);
      } else {
        return this.rootBin
          .getItemsInRadius(x, y, radius)
          .sort((a, b) => a.distSqrd - b.distSqrd)
          .slice(0, maxItems)
          .map(v => v.data);
      }
    }
  }
};

new p5(sketch, 'p5canvas');