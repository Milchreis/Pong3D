let ball;
let leftPaddle;
let rightPaddle;
let font;
let isMultiplayer;
let hitsounds = [];

function startSingleplayer() {
    startGame(false);
}

function startMultiplayer() {
    startGame(true);
}

function startGame(multiplayer) {
    isMultiplayer = multiplayer;
    document.getElementById("modeSelection").style.display = "none";
    document.getElementById("instructions").style.display = "block";
    document.getElementById("sketch-holder").style.display = "block";
    loop();
}

function preload() {
    font = loadFont('font/edunline.ttf');
}

function setup() {
    smooth();
    userStartAudio();

    let canvas = createCanvas(800, 400, WEBGL);
    canvas.parent('sketch-holder');

    textFont(font);
    textSize(25);
    textAlign(CENTER, CENTER);

    angleMode(DEGREES);

    ball = new Ball(width / 2, height / 2, 10);
    leftPaddle = new Paddle(50, height / 2, 100);
    rightPaddle = new Paddle(width - 50, height / 2, 100);

    noLoop();
}

function draw() {
    background(33, 33, 33);

    //let angle = map(sin(millis() / 10), -1, 1, -8, 8);
    let angle = map(ball.x, 0, width, -8, 8);
    rotateY(angle);

    translate(-width / 2, -height / 2, -80);

    pointLight(200, 200, 200, width / 2, height / 2, 1000);

    checkInput();
    checkPoints();

    ball.update();
    leftPaddle.update(!isMultiplayer ? ball : undefined);
    rightPaddle.update();

    let hitLeft = ball.checkCollision(leftPaddle);
    let hitRight = ball.checkCollision(rightPaddle);

    if (hitLeft || hitRight) {
        leftPaddle.speedUp();
        rightPaddle.speedUp();
    }

    leftPaddle.render();
    rightPaddle.render();
    ball.render();

    fill(255);
    push();
    translate(width / 2, 15, 0);
    text(leftPaddle.points + " : " + rightPaddle.points, 0, 0);
    pop();

}

function checkPoints() {
    if (ball.x > width + 100) {
        leftPaddle.points++;
        ball.reset();

    } else if (ball.x < -100) {
        rightPaddle.points++;
        ball.reset();
    }
}

function checkInput() {

    if (keyIsDown(87))
        leftPaddle.up();

    if (keyIsDown(83))
        leftPaddle.down();

    if (keyIsDown(UP_ARROW))
        rightPaddle.up();

    if (keyIsDown(DOWN_ARROW))
        rightPaddle.down();
}
