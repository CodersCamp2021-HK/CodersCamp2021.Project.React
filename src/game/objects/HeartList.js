import { Heart } from './Heart';
import { Vector } from '../shared';
import { GameObject } from '../engine';

class HeartList extends GameObject {
  // @ts-ignore
  #list = [];

  /**
   * @param {number} hp
   */
  createHeartList(hp) {
    let start = 0;
    for (let i = 0; i < hp; i++) {
      this.#list.push(this.create(Heart, { args: { initialPos: new Vector(start, 0) } }));
      start += 15;
    }
  }

  clearHeartList() {
    this.#list.forEach((heart) => {
      this.destroy(heart);
    });
  }
}

export { HeartList };
