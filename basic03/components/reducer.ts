import Tetris from "./tetris";
import { Reducer } from "redux";
import shapes from "./shape";

export const getRandomShape = (): Tetris => {
  return Object.create(shapes[Math.floor(Math.random() * shapes.length)]);
};

export type gameMapState = { imageX: number; imageY: number }[][];

interface Action {
  type: string;
}

interface gameMapAction extends Action {
  map: gameMapState;
}

export const gameMapReducer: Reducer<gameMapState, gameMapAction> = (
  state: gameMapState = [],
  action
) => {
  let newState = state.slice();
  switch (action.type) {
    case "RESET":
      return (newState = action.map);
    case "UPDATE":
      return (newState = action.map);
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

export const shapeReducer: Reducer<Tetris, Action> = (
  state: Tetris = getRandomShape(),
  action: Action
) => {
  let newShape = state;
  switch (action.type) {
    case "UPDATE":
      return (newShape = getRandomShape());
    default:
      return newShape;
  }
};
