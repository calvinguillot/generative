import p5 from "p5";

let sketch = function(p5) {
  let iterX, iterY, xOff, yOff, fr;
  let wW = window.innerWidth;
  let wH = window.innerHeight;
  let colours = [
    "#F7F7F7",
    "#ECECEC",
    "#0095a8",
    "#00616f",
    "#FF3300",
    "#FF6600"
  ];
  p5.setup = () => {
    p5.createCanvas(wW, wH);
    iterX = p5.floor(wW / 100);
    iterY = p5.floor(wH / 100);
    xOff = (wW - (iterX * 100 - 60)) / 2;
    yOff = (wH - (iterY * 100 - 60)) / 2;
    p5.strokeWeight(10);
    fr = 60;
  };
  p5.draw = () => {
    if (fr < 2) {
      p5.noLoop();
    }

    p5.background("#333333");
    p5.frameRate(fr);
    let tempX = xOff;
    let tempY = yOff;
    for (let i = 0; i < iterX; i++) {
      for (let j = 0; j < iterY; j++) {
        p5.stroke(colours[p5.floor(p5.random(0, colours.length))]);
        p5.strokeWeight(10);
        new Glyph(tempX, tempY);
        tempY += 100;
      }
      tempX += 100;
      tempY = yOff;
    }
    tempX = xOff;
    fr--;
  };
  class Glyph {
    constructor(x, y) {
      let points = new Array();
      let yIn = y;
      for (let i = 0; i < 3; i++) {
        points[i] = new Array();
        for (let j = 0; j < 3; j++) {
          points[i].push([x, yIn]);
          yIn += 20;
        }
        x += 20;
        yIn = y;
      }

      for (let i = 0; i < p5.floor(p5.random(3, 9)); i++) {
        lineMaker(points);
      }
    }
  }

  function lineMaker(arrPoints) {
    let oriX = p5.floor(p5.random(0, 3));
    let oriY = p5.floor(p5.random(0, 3));
    let nearP = findNear(arrPoints, oriX, oriY);
    let endX = p5.floor(p5.random(0, nearP.length));
    let endY = p5.floor(p5.random(0, nearP.length));
    let x1 = arrPoints[oriX][oriY][0];
    let y1 = arrPoints[oriX][oriY][1];
    let x2 = nearP[endX][0];
    let y2 = nearP[endY][1];

    p5.line(x1, y1, x2, y2);
  }

  function findNear(arr, i, j) {
    let returnArr = new Array();
    var row = arr.length - 1;
    var col = arr[0].length - 1;
    for (var x = Math.max(0, i - 1); x <= Math.min(i + 1, row); x++) {
      for (var y = Math.max(0, j - 1); y <= Math.min(j + 1, col); y++) {
        if (x !== i || y !== j) {
          returnArr.push(arr[x][y]);
        }
      }
    }
    return returnArr;
  }
};

new p5(sketch, 'p5canvas');