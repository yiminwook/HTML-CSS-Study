import { template } from "../types/type";
import { squareCountX, squareCountY } from "./global";
import { gameMap, score } from "./store";

export default class Tetris {
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
        if (gameMap.getState()[realY + 1][realX].imageX !== -1) {
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
        if (gameMap.getState()[realY][realX - 1].imageX !== -1) {
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
        if (gameMap.getState()[realY][realX + 1].imageX !== -1) {
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
      score.dispatch({ type: "DOWN" });
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
        if (gameMap.getState()[realY][realX].imageX !== -1) {
          this.template = tempTemplate;
        }
      }
    }
  }
}
