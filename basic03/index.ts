import {
  gameSpeed,
  framePerSecond,
  squareCountX,
  squareCountY,
  resetButton,
  footerUrl,
} from "./components/global";
import "./tetris.scss";
import store, {
  currentShape,
  gameMap,
  gameOver,
  nextShape,
  score,
} from "./components/store";
import { draw } from "./components/draw";
import { gameMapState } from "./components/reducer";

resetButton.addEventListener("click", () => {
  resetVars();
});

footerUrl.addEventListener("click", (e) => {
  window.open("https://github.com/servetgulnaroglu/tetris-js");
});

const gameLoop = () => {
  setInterval(update, 1000 / gameSpeed);
  setInterval(draw, 1000 / framePerSecond);
};

const deleteCompleteRows = () => {
  for (let i = 0; i < gameMap.getState().length; i++) {
    let t = gameMap.getState()[i];
    let isComplete = true;
    // 위부터 한줄씩 돈다.
    for (let j = 0; j < t.length; j++) {
      if (t[j].imageX === -1) {
        isComplete = false;
      }
    }
    // 한줄을 다 돌고 isComplete가 true로 남아 있을 때
    if (isComplete) {
      score.dispatch({ type: "DELROW" });
      for (let k = i; k > 0; k--) {
        gameMap.getState()[k] = gameMap.getState()[k - 1];
      }
      let temp: { imageX: -1; imageY: -1 }[] = [];
      for (let j = 0; j < squareCountX; j++) {
        temp.push({ imageX: -1, imageY: -1 });
      }
      gameMap.getState()[0] = temp;
    }
  }
};

const update = () => {
  if (gameOver.getState()) return;
  if (currentShape.getState().checkBottom()) {
    currentShape.getState().y += 1;
  } else {
    for (let k = 0; k < currentShape.getState().template.length; k++) {
      for (let l = 0; l < currentShape.getState().template.length; l++) {
        if (currentShape.getState().template[k][l] === 0) continue;
        gameMap.getState()[currentShape.getState().getTruncedPosition().y + l][
          currentShape.getState().getTruncedPosition().x + k
        ] = {
          imageX: currentShape.getState().imageX,
          imageY: currentShape.getState().imageY,
        };
      }
    }
    deleteCompleteRows();
    currentShape.dispatch({ type: "UPDATE" });
    nextShape.dispatch({ type: "UPDATE" });
    if (!currentShape.getState().checkBottom()) {
      gameOver.dispatch({ type: "GAMEOVER" });
    }
    score.dispatch({ type: "NEXT" });
  }
};

const resetVars = () => {
  let initialTwoDArr: gameMapState = [];
  for (let i = 0; i < squareCountY; i++) {
    let temp: { imageX: number; imageY: number }[] = [];
    for (let j = 0; j < squareCountX; j++) {
      temp.push({ imageX: -1, imageY: -1 });
    }
    initialTwoDArr.push(temp);
  }
  gameOver.dispatch({ type: "RESET" });
  score.dispatch({ type: "RESET" });
  currentShape.dispatch({ type: "UPDATE" });
  nextShape.dispatch({ type: "UPDATE" });
  store.gameMap.dispatch({ type: "RESET", map: initialTwoDArr });
};

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 37) {
    currentShape.getState().moveLeft();
  } else if (e.keyCode === 38) {
    currentShape.getState().changeRotation();
  } else if (e.keyCode === 39) {
    currentShape.getState().moveRight();
  } else if (e.keyCode === 40) {
    currentShape.getState().moveBottom();
  }
});

resetVars();
gameLoop();
