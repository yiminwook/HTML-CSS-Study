import "./tetris.scss";

const mainColor: string = "#bca0dc";
const imageSquareSize = 24;
const size = 40;
const framePerSecond = 24;
const gameSpeed = 5;
const canvas = document.querySelector("#canvas")! as HTMLCanvasElement;
const nextShapeCanvas = document.querySelector(
  "#canvas-next_shape"
)! as HTMLCanvasElement;
const scoreCanvas = document.querySelector(
  "#canvas-score"
)! as HTMLCanvasElement;
const image = document.querySelector("#image")! as HTMLImageElement;
/** main canvas 2D Context */
const ctx = canvas.getContext("2d");
/** next shape canvas 2D Context */
const nctx = nextShapeCanvas.getContext("2d");
/** score canvas 2D Context */
const sctx = scoreCanvas.getContext("2d");
/** canvas.width / size = 10 */
const squareCountX = canvas.width / size;
/** canvas.height / size = 20 */
const squareCountY = canvas.height / size;
/** 경계선 너비 */
const whiteLineThickness = 4;

const resetButton = document.querySelector(
  "#button-reset"
)! as HTMLButtonElement;

resetButton.addEventListener("click", () => {
  resetVars();
});

const footerUrl = document.querySelector("#footer-url")! as HTMLAnchorElement;
footerUrl.addEventListener("click", (e) => {
  window.open("https://github.com/servetgulnaroglu/tetris-js");
});

type template = number[][];

class Tetris {
  /** rotations.img X */
  imageX: number;
  /** rotations.img Y */
  imageY: number;
  template: template;
  /** 테트리스 이동거리 X */
  x: number;
  /** 테트리스 이동거리 Y */
  y: number;

  constructor(imageX: number, imageY: number, template: template) {
    this.imageX = imageX;
    this.imageY = imageY;
    this.template = template;
    this.x = squareCountX / 2;
    //18이 바닥
    this.y = 0;
  }

  getTruncedPosition() {
    return { x: Math.trunc(this.x), y: Math.trunc(this.y) };
  }

  checkBottom() {
    for (let i = 0; i < this.template.length; i++) {
      for (let j = 0; j < this.template.length; j++) {
        if (this.template[i][j] === 0) continue;
        let realX = i + this.getTruncedPosition().x;
        let realY = j + this.getTruncedPosition().y;
        if (realY + 1 >= squareCountY) {
          return false;
        }
        if (gameMap[realY + 1][realX].imageX !== -1) {
          return false;
        }
      }
    }
    return true;
  }

  checkLeft() {
    for (let i = 0; i < this.template.length; i++) {
      for (let j = 0; j < this.template.length; j++) {
        if (this.template[i][j] === 0) continue;
        let realX = i + this.getTruncedPosition().x;
        let realY = j + this.getTruncedPosition().y;
        if (realX - 1 < 0) {
          return false;
        }
        if (gameMap[realY][realX - 1].imageX !== -1) {
          return false;
        }
      }
    }
    return true;
  }

  checkRight() {
    for (let i = 0; i < this.template.length; i++) {
      for (let j = 0; j < this.template.length; j++) {
        if (this.template[i][j] === 0) continue;
        let realX = i + this.getTruncedPosition().x;
        let realY = j + this.getTruncedPosition().y;
        if (realX + 1 >= squareCountX) {
          return false;
        }
        if (gameMap[realY][realX + 1].imageX !== -1) {
          return false;
        }
      }
    }
    return true;
  }

  moveRight() {
    if (this.checkRight()) {
      this.x += 1;
    }
  }

  moveLeft() {
    if (this.checkLeft()) {
      this.x -= 1;
    }
  }

  moveBottom() {
    if (this.checkBottom()) {
      this.y += 1;
      score += 1;
    }
  }

  changeRotation() {
    let tempTemplate: template = [];
    //배열을 복사
    for (let i = 0; i < this.template.length; i++) {
      tempTemplate[i] = this.template[i].slice();
    }
    const n = this.template.length;
    for (let layer = 0; layer < n / 2; layer++) {
      /** template 첫번째 index */
      let first = layer;
      /** template 마지막 index */
      let last = n - layer - 1;
      for (let i = first; i < last; i++) {
        let offset = i - first;
        console.log(first, last, offset);
        let top = this.template[first][i];
        this.template[first][i] = this.template[i][last]; //top = right
        this.template[i][last] = this.template[last][last - offset]; //right = bottom
        this.template[last][last - offset] =
          this.template[last - offset][first]; //bottom = left
        this.template[last - offset][first] = top; //left = top
      }
    }
    //롤백
    for (let i = 0; i < this.template.length; i++) {
      for (let j = 0; j < this.template.length; j++) {
        if (this.template[i][j] === 0) continue;
        let realX = i + this.getTruncedPosition().x;
        let realY = j + this.getTruncedPosition().y;
        if (
          realX < 0 ||
          realX >= squareCountX ||
          realY < 0 ||
          realY >= squareCountY
        ) {
          this.template = tempTemplate;
        }
        if (gameMap[realY][realX].imageX !== -1) {
          this.template = tempTemplate;
        }
      }
    }
  }
}

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

let gameMap: { imageX: number; imageY: number }[][];
let gameOver: boolean = false;
let currentShape: Tetris;
let nextShape: Tetris;
let score: number = 0;
let initialTwoDArr: { imageX: number; imageY: number }[][] = [];

const gameLoop = () => {
  setInterval(update, 1000 / gameSpeed);
  setInterval(draw, 1000 / framePerSecond);
};

const deleteCompleteRows = () => {
  for (let i = 0; i < gameMap.length; i++) {
    let t = gameMap[i];
    let isComplete = true;
    // 위부터 한줄씩 돈다.
    for (let j = 0; j < t.length; j++) {
      if (t[j].imageX === -1) {
        isComplete = false;
      }
    }
    // 한줄을 다 돌고 isComplete가 true로 남아 있을 때
    if (isComplete) {
      score += 1000;
      for (let k = i; k > 0; k--) {
        gameMap[k] = gameMap[k - 1];
      }
      let temp: { imageX: -1; imageY: -1 }[] = [];
      for (let j = 0; j < squareCountX; j++) {
        temp.push({ imageX: -1, imageY: -1 });
      }
      gameMap[0] = temp;
    }
  }
};

const update = () => {
  if (gameOver) return;
  if (currentShape.checkBottom()) {
    currentShape.y += 1;
  } else {
    for (let k = 0; k < currentShape.template.length; k++) {
      for (let l = 0; l < currentShape.template.length; l++) {
        if (currentShape.template[k][l] === 0) continue;
        gameMap[currentShape.getTruncedPosition().y + l][
          currentShape.getTruncedPosition().x + k
        ] = { imageX: currentShape.imageX, imageY: currentShape.imageY };
      }
    }
    deleteCompleteRows();
    currentShape = nextShape;
    nextShape = getRandomShape();
    if (!currentShape.checkBottom()) {
      gameOver = true;
    }
    score += 100;
  }
};

const drawRect = (
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

const drawBackground = () => {
  //뒷배경
  drawRect(0, 0, canvas.width, canvas.height, mainColor);
  //경계선
  for (let i = 0; i < squareCountX + 1; i++) {
    drawRect(
      size * i - whiteLineThickness,
      0,
      whiteLineThickness,
      canvas.height,
      "white"
    );
  }

  for (let i = 0; i < squareCountY + 1; i++) {
    drawRect(
      0,
      size * i - whiteLineThickness,
      canvas.width,
      whiteLineThickness,
      "white"
    );
  }
};

const drawCurrentTetris = () => {
  for (let i = 0; i < currentShape.template.length; i++) {
    for (let j = 0; j < currentShape.template.length; j++) {
      if (currentShape.template[i][j] === 0) continue;
      if (ctx) {
        ctx.drawImage(
          image,
          currentShape.imageX,
          currentShape.imageY,
          imageSquareSize,
          imageSquareSize,
          Math.trunc(currentShape.x) * size + size * i,
          Math.trunc(currentShape.y) * size + size * j,
          size,
          size
        );
      }
    }
  }
};

const drawSquares = () => {
  for (let i = 0; i < gameMap.length; i++) {
    let t = gameMap[i];
    for (let j = 0; j < t.length; j++) {
      if (t[j].imageX == -1) continue;
      if (ctx) {
        ctx.drawImage(
          image,
          t[j].imageX,
          t[j].imageY,
          imageSquareSize,
          imageSquareSize,
          j * size,
          i * size,
          size,
          size
        );
      }
    }
  }
};

const drawNextShape = () => {
  if (nctx) {
    nctx.fillStyle = mainColor;
    nctx.fillRect(0, 0, nextShapeCanvas.width, nextShapeCanvas.height);
    for (let i = 0; i < nextShape.template.length; i++) {
      for (let j = 0; j < nextShape.template.length; j++) {
        if (nextShape.template[i][j] === 0) continue;
        nctx.drawImage(
          image,
          nextShape.imageX,
          nextShape.imageY,
          imageSquareSize,
          imageSquareSize,
          size * i,
          size * j + size,
          size,
          size
        );
      }
    }
  }
};

const drawScore = () => {
  if (sctx) {
    sctx.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
    sctx.font = "64px Poppins";
    sctx.fillStyle = "black";
    let scoreToString = score.toString();
    let scoreX = 125 - scoreToString.length * 25;
    sctx.fillText(scoreToString, scoreX, 125);
  }
};

const drawGameOver = () => {
  if (ctx) {
    ctx.font = "64px Poppins";
    ctx.fillStyle = "black";
    ctx.fillText("Game Over!", 10, canvas.height / 2);
  }
};

const draw = () => {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawSquares();
    drawCurrentTetris();
    drawNextShape();
    drawScore();
    if (gameOver) {
      drawGameOver();
    }
  }
};

const getRandomShape = (): Tetris => {
  return Object.create(shapes[Math.floor(Math.random() * shapes.length)]);
};

const resetVars = () => {
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
  nextShape = getRandomShape();
  gameMap = initialTwoDArr;
};

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 37) {
    currentShape.moveLeft();
  } else if (e.keyCode === 38) {
    currentShape.changeRotation();
  } else if (e.keyCode === 39) {
    currentShape.moveRight();
  } else if (e.keyCode === 40) {
    currentShape.moveBottom();
  }
});

resetVars();
gameLoop();
