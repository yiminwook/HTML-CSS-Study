import Tetris from "./tetris";
import { Action, Reducer } from "redux";
import shapes from "./shape";

export const getRandomShape = (): Tetris => {
  return Object.create(shapes[Math.floor(Math.random() * shapes.length)]);
};

export type gameMapState = { imageX: number; imageY: number }[][];
interface gameMapAction {
  type: string;
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

export const gameOverReducer: Reducer = (state: boolean = false, action) => {
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

export const scoreReducer: Reducer<number> = (
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

export const shapeReducer: Reducer<Tetris, { type: string; shape: Tetris }> = (
  state: Tetris = getRandomShape(),
  action
) => {
  let newShape = state;
  switch (action.type) {
    case "UPDATE":
      return (newShape = action.shape);
    default:
      return newShape;
  }
};
