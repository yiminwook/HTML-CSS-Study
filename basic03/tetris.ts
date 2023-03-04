import "./tetris.scss";
type templete = number[][];

class Tetris {
  imageX: number;
  imageY: number;
  templete: templete;

  constructor(imageX: number, imageY: number, templete: templete) {
    this.imageX = imageX;
    this.imageY = imageY;
    this.templete = templete;
  }

  checkBottom() {}

  checkLeft() {}
  checkRight() {}
  moveRight() {}
  moveLeft() {}
  moveBottom() {
    // changeRotation() {
    // }
  }
}

const imageSquareSize = 24;
const size = 40;
const framePerSecond = 24;
const gameSpeed = 5;
const canvas = document.querySelector("#canvas")! as HTMLCanvasElement;
const image = document.querySelector("#image")! as HTMLImageElement;
const ctx = canvas.getContext("2d");
const squareCountX = canvas.width / size;
const squareCountY = canvas.height / size;

const shapes = [
  new Tetris(0, 120, [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ]),
  new Tetris(0, 96, [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ]),
  new Tetris(0, 72, [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ]),
  new Tetris(0, 48, [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ]),
  new Tetris(0, 24, [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ]),
  new Tetris(0, 0, [
    [1, 1],
    [1, 1],
  ]),
  new Tetris(0, 48, [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ]),
];

let gameMap;
let gameOver: boolean;
let currentShape: Tetris;
let nextShape: { imageX: number; imageY: number }[][];
let score: number;
let initialTwoDArr: { imageX: number; imageY: number }[][];
let whiteLineThickness = 4;

let update = () => {};
let drawRect = (
  x: number,
  y: number,
  width: number,
  height: number,
  color: string
) => {
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }
};

let drawBackground = () => {
  drawRect(0, 0, canvas.width, canvas.height, "#bca0dc");
  for (let i = 0; i < squareCountX + 1; i++) {
    drawRect(
      size * i - whiteLineThickness,
      0,
      whiteLineThickness,
      canvas.height,
      "white"
    );
  }
};

let draw = () => {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    // drawSquares();
    // drawCurrentTetris();
    // drawNextShape();
    if (gameOver) {
      // drawGameOver();
    }
  }
};

let getRandomShape = (): Tetris => {
  return Object.create(shapes[Math.floor(Math.random() * shapes.length)]);
};

let resetVars = () => {
  initialTwoDArr = [];
  for (let i = 0; i < squareCountY; i++) {
    let temp: { imageX: number; imageY: number }[] = [];
    for (let j = 0; j < squareCountX; j++) {
      temp.push({ imageX: -1, imageY: -1 });
    }
    initialTwoDArr.push(temp);
  }
  score = 0;
  gameOver = false;
  currentShape = getRandomShape();
  nextShape = initialTwoDArr;
};

let gameLoop = () => {
  setInterval(update, 1000 / gameSpeed);
  setInterval(draw, 1000 / framePerSecond);
};

gameLoop();
