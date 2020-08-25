import p5 from "p5";

let sketch = function (p5) {
    let xInit, yInit, wW, wH, size, resetX, resetY, extraX;
    p5.setup = () => {
        wW = window.innerWidth;
        wH = window.innerHeight;
        p5.createCanvas(wW, wH);
        p5.angleMode(p5.DEGREES);
        p5.background(255);
        p5.strokeWeight(2);
        if (wW > wH) {
            size = wH / 24;
            resetX = (wW - size * 14) / 2 + size * 1.5;
            xInit = resetX;
            resetY = size * 1.5;
            yInit = resetY;
            extraX = 0;
        } else {
            size = wW / 14;
            resetY = wH - size * 24;
            yInit = resetY;
            resetX = 0;
            xInit = resetX;
            extraX = size * 1.5;
        }
        p5.frameRate(5);
    };
    p5.draw = () => {
        p5.fill(255, 200);
        p5.noStroke();
        p5.rect(0, 0, wW, wH);
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 22; j++) {
                p5.noFill();
                p5.stroke(0);
                new Square(
                    xInit + p5.random(-j, j) + extraX,
                    yInit + p5.random(-j / 2, j / 2),
                    p5.random(-j, j)
                );
                yInit += size;
            }
            xInit += size;
            yInit = resetY;
        }
        xInit = resetX;
    };
    class Square {
        constructor(x, y, a) {
            p5.push();
            p5.translate(x, y);
            p5.rotate(a);
            p5.rect(-size / 2, -size / 2, size, size);
            p5.pop();
        }
    }

};

new p5(sketch, 'p5canvas');