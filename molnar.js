import p5 from "p5";

let sketch = function (p5) {
    let offVal, iters, xInit, yInit, maxS, sca, tX, tY, wW, wH;
    let colours = [
        "#9E2D31",
        "#7C4C9F",
        "#82C7FE",
        "#CAE6FC",
        "#E3C627",
        "#638A38",
        "#6252AD"
    ];

    p5.setup = () => {
        p5.createCanvas(window.innerWidth, window.innerHeight);
        iters = 0;
        maxS = 1;
        wW = window.innerWidth;
        wH = window.innerHeight;
        if (wW > wH) {
            sca = p5.floor(wH / 10);
        } else {
            sca = p5.floor(wW / 10);
        }
        xInit = 0;
        yInit = 0;
        tX = (wW - (sca * 1.25 * 6 - sca * 0.5)) / 2;
        tY = (wH - (sca * 1.25 * 6 - sca * 0.5)) / 2;
        p5.noFill();
        p5.frameRate(1);
        // p5.strokeWeight(2)
    };
    p5.draw = () => {
        p5.translate(tX, tY);
        p5.background("#302826");
        maxS = p5.floor(p5.random(1, 8));
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                let col = p5.floor(p5.random(0, colours.length));
                for (let k = 0; k < maxS; k++) {
                    new Square(xInit, yInit, colours[col]);
                }
                yInit += sca * 1.25;
            }
            xInit += sca * 1.25;
            yInit = 0;
        }
        xInit = 0;
    };
    class Square {
        constructor(x, y, c) {
            p5.stroke(c);
            p5.beginShape();
            p5.vertex(x + offset(), y + offset());
            p5.vertex(x + sca + offset(), y + offset());
            p5.vertex(x + sca + offset(), y + sca + offset());
            p5.vertex(x + offset(), y + sca + offset());
            p5.endShape(p5.CLOSE);
        }
    }
    function offset() {
        return p5.floor(p5.random(-(sca * 0.25), sca * 0.25));
    }
};

new p5(sketch, 'p5canvas');