import {
  gameSpeed,
  framePerSecond,
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
      gameMap.dispatch({ type: "DELROW", index: i });
    }
  }
};

const update = async () => {
  if (gameOver.getState()) return;
  if (currentShape.getState().checkBottom()) {
    currentShape.dispatch({ type: "MOVE" });
  } else {
    gameMap.dispatch({ type: "UPDATE" });
    deleteCompleteRows();
    currentShape.dispatch({ type: "UPDATE" });
    nextShape.dispatch({ type: "REFRESH" });
    if (!currentShape.getState().checkBottom()) {
      gameOver.dispatch({ type: "GAMEOVER" });
    }
    score.dispatch({ type: "NEXT" });
  }
};

const resetVars = () => {
  gameOver.dispatch({ type: "RESET" });
  score.dispatch({ type: "RESET" });
  currentShape.dispatch({ type: "RESET" });
  nextShape.dispatch({ type: "REFRESH" });
  store.gameMap.dispatch({ type: "RESET" });
};

window.addEventListener("keydown", (e) => {
  const curr = currentShape.getState();
  if (e.keyCode === 37) {
    curr.moveLeft();
  } else if (e.keyCode === 38) {
    curr.changeRotation();
  } else if (e.keyCode === 39) {
    curr.moveRight();
  } else if (e.keyCode === 40) {
    curr.moveBottom();
  }
});

resetVars();
gameLoop();
