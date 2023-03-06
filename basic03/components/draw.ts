import {
  canvas,
  ctx,
  image,
  imageSquareSize,
  mainColor,
  nctx,
  nextShapeCanvas,
  scoreCanvas,
  sctx,
  size,
  squareCountX,
  squareCountY,
  whiteLineThickness,
} from "./global";
import { currentShape, gameMap, gameOver, nextShape, score } from "./store";

export const drawRect = (
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

export const drawBackground = () => {
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

export const drawCurrentTetris = () => {
  const length = currentShape.getState().template.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const { template, imageX, imageY, x, y } = currentShape.getState();
      if (template[i][j] === 0) continue;
      if (ctx) {
        ctx.drawImage(
          image,
          imageX,
          imageY,
          imageSquareSize,
          imageSquareSize,
          x * size + size * i,
          y * size + size * j,
          size,
          size
        );
      }
    }
  }
};

export const drawSquares = () => {
  for (let i = 0; i < gameMap.getState().length; i++) {
    let t = gameMap.getState()[i];
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

export const drawNextShape = () => {
  if (nctx) {
    nctx.fillStyle = mainColor;
    nctx.fillRect(0, 0, nextShapeCanvas.width, nextShapeCanvas.height);
    const length = nextShape.getState().template.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        const { template, imageX, imageY } = nextShape.getState();
        if (template[i][j] === 0) continue;
        nctx.drawImage(
          image,
          imageX,
          imageY,
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

export const drawScore = () => {
  if (sctx) {
    sctx.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
    sctx.font = "64px Poppins";
    sctx.fillStyle = "black";
    let scoreToString = score.getState().toString();
    let scoreX = 125 - scoreToString.length * 25;
    sctx.fillText(scoreToString, scoreX, 125);
  }
};

export const drawGameOver = () => {
  if (ctx) {
    ctx.font = "64px Poppins";
    ctx.fillStyle = "black";
    ctx.fillText("Game Over!", 10, canvas.height / 2);
  }
};

export const draw = () => {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawSquares();
    drawCurrentTetris();
    drawNextShape();
    drawScore();
    if (gameOver.getState()) {
      drawGameOver();
    }
  }
};
