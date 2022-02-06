import { Heart } from './Heart';
import { Vector } from '../shared';
import { GameObject } from '../engine';

class HeartList extends GameObject {
  /**
   * @type {Array<GameObject>}
   */
  #list = [];

  /**
   * @param {number} hp
   */
  createHeartList(hp) {
    for (let i = 0; i < hp; i++) {
      this.#list.push(this.create(Heart, { args: { initialPos: new Vector(i * 15, 0) } }));
    }
  }

  clearHeartList() {
    this.#list.forEach((heart) => {
      this.destroy(heart);
    });
  }
}

export { HeartList };
