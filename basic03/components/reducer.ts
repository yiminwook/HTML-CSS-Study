import Tetris from "./tetris";
import shapes from "./shape";
import { squareCountX, squareCountY } from "./global";
import { currentShape, nextShape } from "./store";
import { Reducer, Action } from "redux";

export const getRandomShape = (): Tetris => {
  const [imageX, imageY, tempTemplate] =
    shapes[Math.floor(Math.random() * shapes.length)];
  const copiedTemplate = tempTemplate.slice().map((arr) => arr.slice());
  return new Tetris(imageX, imageY, copiedTemplate);
};

export type gameMapState = { imageX: number; imageY: number }[][];

interface gameMapAction extends Action {
  index?: number;
}

const initMap = () => {
  let initialTwoDArr: gameMapState = [];
  for (let i = 0; i < squareCountY; i++) {
    let temp: { imageX: number; imageY: number }[] = [];
    for (let j = 0; j < squareCountX; j++) {
      temp.push({ imageX: -1, imageY: -1 });
    }
    initialTwoDArr.push(temp);
  }
  return initialTwoDArr;
};

export const gameMapReducer: Reducer<gameMapState, gameMapAction> = (
  state: gameMapState = initMap(),
  action: gameMapAction
) => {
  let newState: gameMapState = state.slice().map((arr) => arr.slice());

  switch (action.type) {
    case "RESET":
      return (newState = initMap());
    case "UPDATE":
      const { template, imageX, imageY } = currentShape.getState();
      for (let k = 0; k < template.length; k++) {
        for (let l = 0; l < template.length; l++) {
          const { x, y } = currentShape.getState().getTruncedPosition();
          if (template[k][l] !== 0) {
            newState[y + l][x + k] = {
              imageX: imageX,
              imageY: imageY,
            };
          }
        }
      }
      return newState;
    case "DELROW":
      if (action.index) {
        for (let k = action.index; k > 0; k--) {
          newState[k] = newState[k - 1];
        }
        let temp: { imageX: -1; imageY: -1 }[] = [];
        for (let j = 0; j < squareCountX; j++) {
          temp.push({ imageX: -1, imageY: -1 });
        }
        newState[0] = temp;
        return newState;
      }
      return newState;
    default:
      return newState;
  }
};

export const gameOverReducer: Reducer<boolean, Action> = (
  state: boolean = false,
  action: Action
) => {
  let newState = state;
  switch (action.type) {
    case "GAMEOVER":
      return (newState = true);
    case "RESET":
      return (newState = false);
    default:
      return newState;
  }
};

export const scoreReducer: Reducer<number, Action> = (
  state: number = 0,
  action: Action
) => {
  let newScore = state;
  switch (action.type) {
    case "RESET":
      return (newScore = 0);
    case "DOWN":
      return (newScore += 1);
    case "NEXT":
      return (newScore += 100);
    case "DELROW":
      return (newScore += 1000);
    default:
      return newScore;
  }
};

export const currentShapeReducer: Reducer<Tetris, Action> = (
  state: Tetris = getRandomShape(),
  action: Action & { keyCode?: number }
) => {
  let newShape = state;
  switch (action.type) {
    case "RESET":
      return (newShape = getRandomShape());
    case "UPDATE":
      return (newShape = nextShape.getState());
    case "MOVE":
      newShape.y += 1;
      return newShape;

    case "CONTROL":
      if (action.keyCode) {
        const keyCode = action.keyCode;
        if (keyCode === 37) {
          newShape.moveLeft();
        } else if (keyCode === 38) {
          newShape.changeRotation();
        } else if (keyCode === 39) {
          newShape.moveRight();
        } else if (keyCode === 40) {
          newShape.moveBottom();
        }
      }
      return newShape;
    default:
      return newShape;
  }
};

export const nextShapeReducer: Reducer<Tetris, Action> = (
  state: Tetris = getRandomShape(),
  action: Action
) => {
  let newShape = state;
  switch (action.type) {
    case "REFRESH":
      return (newShape = getRandomShape());
    default:
      return newShape;
  }
};
