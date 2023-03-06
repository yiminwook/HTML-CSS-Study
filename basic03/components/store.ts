import { createStore } from "redux";
import {
  currentShapeReducer,
  gameMapReducer,
  gameOverReducer,
  nextShapeReducer,
  scoreReducer,
} from "./reducer";

export const gameMap = createStore(
  gameMapReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const gameOver = createStore(gameOverReducer);

export const score = createStore(
  scoreReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const currentShape = createStore(currentShapeReducer);

export const nextShape = createStore(nextShapeReducer);

const store = { gameMap, gameOver, score, currentShape, nextShape };

export default store;
