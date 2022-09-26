/* 

const lucky_wheel = {

    developed_by: 'Buga Tamás',

    date: '2022-09-25',

    title: 'Lucky Wheel',

    programming_language: 'javascript',

    description: 'Responsive lucky wheel',

    github: 'https://github.com/bugapapa',

    facebook: 'https://www.facebook.com/buga.tamas1',
}

*/


function colorToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + colorToHex(r) + colorToHex(g) + colorToHex(b);
}

const colors = (slices) => {
    let c = [];
    for (let i = 0; i < slices; i++) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        c.push(rgbToHex(r, g, b));
    }
    return c;
}

function creataTexts(slices) {
    let t = [];
    const texts = ['1000', '2000', '3000', '1000', '5000', '1000', '10000', '2000', '1000'];
    for (let i = 0; i < slices; i++) {
        let r = Math.floor(Math.random() * texts.length);
        t.push(texts[r]);
    }
    return t;
}

let wheelSize = 500;
const boardHeight = 950;
const rotateTime = 10;
const slices = 20;
const sliceColors = colors(slices);
const texts = creataTexts(slices);
const anglePosition = Math.floor(Math.random() * 360);
const endAngle = (360 * 4) + anglePosition;


function wheel(wheelSize, boardHeight, rotateTime, slices) {

    const borderColor = 'black';
    const borderWidth = 2;

    let boardWidth = wheelSize + 20;
    let wheelDiagonal = wheelSize;
    let wheelRadius = wheelDiagonal / 2;
    let sliceHeight = calcHeight(slices, wheelRadius) * 2;
    let incrementAngle = 360 / slices;
    let angle = 0;
    let finishAngle = endAngle;
    let textSize = wheelDiagonal / 16;

    if (document.getElementById('wheel') && document.getElementById('board')) {
        document.getElementById('wheel').remove();
        document.getElementById('board').remove();
    }

    function calcHeight(slices, c) {
        const radian = Math.PI / 180;
        const beta = (360 / slices) / 2;
        const alpha = (90 - beta) * radian;
        const a = c * Math.sin(alpha);
        const b = Math.sqrt((Math.pow(c, 2) - Math.pow(a, 2)));

        return b;
    }

    function calcSagitta(b, radius) {
        const s1 = radius + Math.sqrt(Math.pow(radius, 2) - Math.pow(b, 2));
        const s2 = radius - Math.sqrt(Math.pow(radius, 2) - Math.pow(b, 2));

        return [s1, s2];
    }

    const board = () => {
        const mainDiv = document.createElement('div');
        const mainStyle = {
            width: `${boardWidth}px`,
            height: `${boardHeight}px`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        }
        mainDiv.id = 'board';

        Object.assign(mainDiv.style, mainStyle);

        return mainDiv;
    }

    document.body.appendChild(board());

    const wheel = () => {
        const wheelBoard = document.createElement('div');
        wheelBoard.id = 'wheel';
        const wheelStyle = {
            position: 'relative',
            width: `${wheelDiagonal}px`,
            height: `${wheelDiagonal}px`,
            borderRadius: '50%',
            border: `${borderWidth}px solid ${borderColor}`,
            overflow: 'hidden',
        }

        Object.assign(wheelBoard.style, wheelStyle);

        return wheelBoard;
    }

    document.getElementById('board').appendChild(wheel());

    const spinbutton = () => {
        const btn = document.createElement('button');
        const btnStyle = {
            marginTop: '5%',
            width: '100px',
            height: '50px',
            borderRadius: '10px',
            border: '2px solid black',
            boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.5)',
            fontSize: '1.6em',
            fontWeight: 'bold',
            cursor: 'pointer',
            backgroundColor: '#db4444',
            color: 'white',
        }

        Object.assign(btn.style, btnStyle);

        btn.textContent = 'Spin';

        btn.onmouseover = () => {
            btn.style.backgroundColor = '#ff8a8a';
            btn.style.color = 'white';
        }
        btn.onmouseout = () => {
            Object.assign(btn.style, btnStyle);
        }
        btn.addEventListener('click', () => {

            btn.disabled = true;

            setTimeout(() => {
                btn.disabled = false;
            }, rotateTime * 1000);

            let wheel = document.getElementById("wheel"),
                fps = 60,
                duration = rotateTime, // seconds
                startAngle = 0, // pixel
                finish = finishAngle,
                // distance = finish - startAngle,
                // increment = distance / (duration * fps),
                position = startAngle,
                time = 0,
                handler = setInterval(rotate, 1000 / fps);

            function easeInOutQuad(x, t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                } else {
                    return -c / 2 * ((--t) * (t - 2) - 1) + b;
                }
            }

            function rotate() {
                // position += increment;
                time += 1 / fps;
                position = easeInOutQuad(time * 100 / duration, time, startAngle, finish, duration);

                if (position >= finish) {
                    clearInterval(handler);
                    wheel.style.transform = `rotateZ(${finish}deg)`;
                    return;
                }
                wheel.style.transform = `rotateZ(${position}deg)`;
            }

        });

        return btn;
    }

    document.getElementById('board').appendChild(spinbutton());

    function createSLice(index, angle) {

        const sliceDiv = document.createElement('div');
        const sliceStyle = {
            width: `${wheelRadius}px`,
            height: `${sliceHeight}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: `calc(50% - calc(${sliceHeight}px / 2))`,
            left: '-1px',
            transformOrigin: 'right center',
        }

        Object.assign(sliceDiv.style, sliceStyle);

        sliceDiv.style.transform = `rotateZ(${angle}deg)`;

        const textDiv = document.createElement('div');
        const textStyle = {
            fontSize: `${textSize}px`,
            fontWeight: 'bold',
            letterSpacing: '5px',
            lineHeight: '0px',
            transform: `translateX(-${textSize}px)`,
        }

        Object.assign(textDiv.style, textStyle);

        textDiv.textContent = texts[index];

        sliceDiv.appendChild(textDiv);

        const sagitta = (calcSagitta(calcHeight(slices, wheelRadius), wheelRadius)[1]).toFixed(1);
        const ns = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(ns, 'svg');
        const path = document.createElementNS(ns, 'path');
        const d = `M ${sagitta} 0 L ${wheelRadius} ${sliceHeight / 2} L ${sagitta} ${sliceHeight} A ${wheelRadius} ${wheelRadius} 0 0 1 ${sagitta} 0`;

        const svgStyle = {
            width: `${wheelRadius}`,
            height: `${sliceHeight}px`,
            position: 'absolute',
            top: `calc(50% - calc(${sliceHeight}px / 2))`,
            left: '-1px',
            transformOrigin: 'right center',
        }

        Object.assign(svg.style, svgStyle);

        path.setAttribute('stroke', 'black');
        path.setAttribute('stroke-width', `${borderWidth}`);
        path.setAttribute('fill', `${sliceColors[index]}`);
        path.setAttribute('d', d);

        svg.style.transform = `rotateZ(${angle}deg)`;

        svg.appendChild(path);

        return [svg, sliceDiv];
    }

    for (let i = 0; i < slices; i++) {
        const svg = createSLice(i, angle)[0];
        const text = createSLice(i, angle)[1];

        angle += incrementAngle;

        document.getElementById('wheel').appendChild(svg);
        document.getElementById('wheel').appendChild(text);
    }

}

window.addEventListener('resize', () => {
    let iw = document.documentElement.clientWidth;
    let maxWidth = wheelSize + 20;
    let wheelDiagonal = wheelSize;
    let sd = (maxWidth - iw);

    if (iw <= wheelSize + 20) {
        wheelDiagonal -= sd;
    } else {
        wheelDiagonal = wheelSize;
    }

    wheel(wheelDiagonal, boardHeight, rotateTime, slices);

});

wheel(wheelSize, boardHeight, rotateTime, slices);