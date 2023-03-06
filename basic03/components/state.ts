import { createStore } from "redux";
import {
  gameMapReducer,
  gameOverReducer,
  scoreReducer,
  shapeReducer,
} from "./reducer";

export const gameMap = createStore(
  gameMapReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const gameOver = createStore(
  gameOverReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const score = createStore(
  scoreReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const currentShape = createStore(
  shapeReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const nextShape = createStore(
  shapeReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = { gameMap, gameOver, score, currentShape, nextShape };

export default store;
