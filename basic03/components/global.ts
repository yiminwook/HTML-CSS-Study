export const mainColor: string = "#bca0dc";
export const imageSquareSize = 24;
export const size = 40;
export const framePerSecond = 24;
export const gameSpeed = 5;

export const canvas = document.querySelector("#canvas")! as HTMLCanvasElement;
export const nextShapeCanvas = document.querySelector(
  "#canvas-next_shape"
)! as HTMLCanvasElement;
export const scoreCanvas = document.querySelector(
  "#canvas-score"
)! as HTMLCanvasElement;
export const image = document.querySelector("#image")! as HTMLImageElement;
/** main canvas 2D Context */
export const ctx = canvas.getContext("2d");
/** next shape canvas 2D Context */
export const nctx = nextShapeCanvas.getContext("2d");
/** score canvas 2D Context */
export const sctx = scoreCanvas.getContext("2d");
/** canvas.width / size = 10 */
export const squareCountX = canvas.width / size;
/** canvas.height / size = 20 */
export const squareCountY = canvas.height / size;
/** 경계선 너비 */
export const whiteLineThickness = 4;

export const resetButton = document.querySelector(
  "#button-reset"
)! as HTMLButtonElement;

export const footerUrl = document.querySelector(
  "#footer-url"
)! as HTMLAnchorElement;
