import p5 from "p5";

let sketch = function (p5) {
  let points = [];
  let num;
  let wW, wH;
  p5.setup = () => {
    wW = window.innerWidth;
    wH = window.innerHeight;
    p5.createCanvas(wW, wH);
    p5.background(0);
    num = p5.floor(p5.random(20, 150));
    for (let i = 0; i < num; i++) {
      points.push({
        x: p5.random(wW - 20),
        y: p5.random(wH) - 20,
        n: i
      });
    }
  };
  p5.draw = () => {
    p5.noStroke();
    p5.fill(0, 10);
    p5.rect(0, 0, wW, wH);
    for (let i = 0; i < points.length; i++) {
      points[i].x += p5.random(-10, 10);
      points[i].y += p5.random(-10, 10);
    }
    for (let i = 0; i < points.length; i++) {
      p5.strokeWeight(0.1);
      p5.stroke(255);
      let closest = checkDis(points[i].x, points[i].y, i);
      p5.line(
        points[i].x,
        points[i].y,
        points[closest[0]].x,
        points[closest[0]].y
      );
      p5.line(
        points[i].x,
        points[i].y,
        points[closest[1]].x,
        points[closest[1]].y
      );
    }
  };
  function checkDis(px, py, pIdx) {
    let arr = [];
    let retArr = [];
    for (let i = 0; i < points.length; i++) {
      arr.push(p5.floor(p5.dist(px, py, points[i].x, points[i].y)));
    }
    let tempArr = arr.filter(el => el !== 0);
    let minNum = p5.min(tempArr);
    retArr.push(arr.indexOf(minNum));
    let tempArr2 = tempArr.filter(el => el !== minNum);
    let minNum2 = p5.min(tempArr2);
    retArr.push(arr.indexOf(minNum2));
    return retArr;
  }
};

new p5(sketch, 'p5canvas');